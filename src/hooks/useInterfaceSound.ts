import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-sound';

export function useInterfaceSound() {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) !== 'off'; } catch { return true; }
  });
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
    try { localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off'); } catch { /* Storage is optional. */ }
  }, [enabled]);

  useEffect(() => {
    let context: AudioContext | undefined;
    let lastSound = -1;
    const unlock = (event: Event) => {
      const enablingSound = event.target instanceof Element && event.target.closest('[data-sound-toggle]');
      if (!enabledRef.current && !enablingSound) return;
      try {
        context ??= new AudioContext();
        if (context.state === 'suspended') void context.resume().catch(() => {});
      } catch { /* Keep navigation usable when audio is unavailable. */ }
    };
    const play = (pressed: boolean) => {
      if (!enabledRef.current || context?.state !== 'running') return;
      const now = context.currentTime;
      if (now - lastSound < 0.055) return;
      lastSound = now;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(pressed ? 520 : 760, now);
      oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.05);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(pressed ? 0.14 : 0.085, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.065);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    };
    const onInteract = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest('button, a');
      if (!control || control.hasAttribute('data-sound-toggle')) return;
      if (event instanceof PointerEvent && event.pointerType !== 'mouse' && event.type === 'pointerover') return;
      if (event instanceof MouseEvent && event.relatedTarget instanceof Node && control.contains(event.relatedTarget)) return;
      play(event.type === 'click');
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    document.addEventListener('pointerover', onInteract);
    document.addEventListener('focusin', onInteract);
    document.addEventListener('click', onInteract);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      document.removeEventListener('pointerover', onInteract);
      document.removeEventListener('focusin', onInteract);
      document.removeEventListener('click', onInteract);
      if (context) void context.close().catch(() => {});
    };
  }, []);

  return { soundEnabled: enabled, toggleSound: () => setEnabled((current) => !current) };
}
