import { useEffect, useRef } from 'react';

interface Props { paused?: boolean; }
interface Point { x: number; y: number; t: number; }
const LIFETIME = 680;
const PLASMA_LAYERS = [
  { width: 30, color: '255, 12, 24', alpha: 0.12, blur: 0 },
  { width: 13, color: '255, 30, 45', alpha: 0.7, blur: 22 },
  { width: 3.5, color: '255, 190, 170', alpha: 0.95, blur: 8 },
];

/** Precise native dot, eased focus ring, and a fading plasma ribbon. */
export default function CursorTrail({ paused = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
    if (paused && ringRef.current) ringRef.current.dataset.visible = 'false';
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ring = ringRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let points: Point[] = [];
    let target: Point | null = null;
    let head: Point | null = null;
    let raf = 0;
    let running = false;
    let previousTime = 0;

    const clear = () => {
      cancelAnimationFrame(raf);
      points = [];
      target = head = null;
      running = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (ring) {
        ring.dataset.visible = 'false';
        ring.dataset.pressed = 'false';
        ring.dataset.hover = 'false';
      }
    };
    const resize = () => {
      clear();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      if (pausedRef.current || motion.matches || !finePointer.matches) { clear(); return; }
      const dt = Math.min(now - previousTime, 40);
      previousTime = now;
      if (head && target) {
        const distance = Math.hypot(target.x - head.x, target.y - head.y);
        if (distance > 0.15 || now - target.t < 40) {
          const ease = 1 - Math.exp(-dt / 38);
          head = { x: head.x + (target.x - head.x) * ease, y: head.y + (target.y - head.y) * ease, t: now };
          points.push(head);
        }
        if (ring) ring.style.translate = `${head.x}px ${head.y}px`;
      }
      points = points.filter((point) => now - point.t < LIFETIME).slice(-80);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = '#ff162b';
      // Midpoint quadratic curves keep consecutive segments tangent, even on sharp turns.
      for (const layer of PLASMA_LAYERS) {
        ctx.shadowBlur = layer.blur;
        for (let i = 1; i < points.length - 1; i++) {
          const a = points[i - 1], b = points[i], c = points[i + 1];
          const life = Math.max(0, 1 - (now - b.t) / LIFETIME);
          ctx.strokeStyle = `rgba(${layer.color}, ${life * life * layer.alpha})`;
          ctx.lineWidth = Math.max(0.25, layer.width * life);
          ctx.beginPath();
          ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
          ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
          ctx.stroke();
        }
      }
      if (head && points.length) {
        const intensity = Math.max(0, 1 - (now - head.t) / LIFETIME);
        const radius = 48 + Math.sin(now / 160) * 4;
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, radius);
        glow.addColorStop(0, `rgba(255, 160, 140, ${intensity * 0.75})`);
        glow.addColorStop(0.12, `rgba(255, 30, 45, ${intensity * 0.6})`);
        glow.addColorStop(0.45, `rgba(255, 10, 30, ${intensity * 0.2})`);
        glow.addColorStop(1, 'rgba(255, 10, 30, 0)');
        ctx.shadowBlur = 0;
        ctx.fillStyle = glow;
        ctx.fillRect(head.x - radius, head.y - radius, radius * 2, radius * 2);
      }
      if (points.length) raf = requestAnimationFrame(draw);
      else { running = false; head = target = null; }
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') { clear(); return; }
      if (pausedRef.current || motion.matches || !finePointer.matches) return;
      if (ring) {
        if (!head) ring.style.translate = `${event.clientX}px ${event.clientY}px`;
        ring.dataset.visible = 'true';
        const el = event.target as Element | null;
        const interactive = Boolean(el?.closest?.('a[href], button:not(:disabled), [role="button"], summary, label[for], select:not(:disabled)'));
        ring.dataset.hover = String(interactive);
        ring.dataset.text = String(Boolean(el?.closest?.('input, textarea, [contenteditable="true"], pre, code')));
      }
      target = { x: event.clientX, y: event.clientY, t: performance.now() };
      if (!head) { head = { ...target }; points.push(head); }
      if (!running) {
        running = true;
        previousTime = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && ring) ring.dataset.pressed = 'true';
    };
    const onUp = () => {
      if (ring) ring.dataset.pressed = 'false';
    };
    const onVisibility = () => { if (document.hidden) clear(); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Tab') clear(); };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', clear);
    window.addEventListener('keydown', onKey);
    window.addEventListener('blur', clear);
    document.documentElement.addEventListener('pointerleave', clear);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', clear);
    finePointer.addEventListener('change', clear);
    return () => {
      clear();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', clear);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', clear);
      document.documentElement.removeEventListener('pointerleave', clear);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', clear);
      finePointer.removeEventListener('change', clear);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 h-full w-full mix-blend-screen" />
      <div ref={ringRef} aria-hidden="true" data-visible="false" data-hover="false" data-pressed="false" className="tk-cursor-ring" />
    </>
  );
}
