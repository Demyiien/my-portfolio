const LINES = [
  '$ whoami',
  'demyiien',
  '$ git log --oneline --author="demyiien"',
  'a3f9c21 feat: reader modal + pull quotes',
  '7be02d4 fix: route lookup off-by-one',
  'c41e8aa chore: bump vite',
  '$ fconvert clip.mov /to mp4',
  '[ok] clip.mov -> clip.mp4 (ffmpeg)',
  'iLoveLiyahMarie.forevs',
  '$ python -m app.main --index ./data',
  'INFO  ingestion: 42 chunks embedded',
  'INFO  retrieval: hybrid search ready',
  '$ npm run build -- --target=sambayanan',
  '✓ built in 1.76s',
  '[   12.004312] kernel: never_forget: module loaded',
  '$ cat /etc/motd',
  '  Dare to be Bold. Dare to Build. Dare to Serve.',
  'PORT     STATE   SERVICE',
  '22/tcp   open    ssh',
  '443/tcp  open    https',
  '$ grep -r "TODO" src/ | wc -l',
  '0',
  'export ISKOLAR_NG_BAYAN=true',
  '$ ping -c 1 github.com',
  '64 bytes from github.com: icmp_seq=1 ttl=54 time=19.7 ms',
];

const COLUMNS = [
  { offset: 0, dur: '95s' },
  { offset: 7, dur: '120s' },
  { offset: 13, dur: '105s' },
  { offset: 19, dur: '135s' },
];

function Column({ offset, dur }: { offset: number; dur: string }) {
  const lines = [...LINES.slice(offset), ...LINES.slice(0, offset)];
  // Render the list twice so the -50% translate loops seamlessly.
  const doubled = [...lines, ...lines, ...lines, ...lines];
  return (
    <pre className="tk-code-col" style={{ ['--dur' as string]: dur }}>
      {doubled.map((l, i) => (
        <span key={i} className={l.startsWith('$') ? 'tk-code-prompt' : undefined}>
          {l + '\n'}
        </span>
      ))}
    </pre>
  );
}

export default function BackgroundEffects() {
  return (
    <>
      <div className="tk-ambient" aria-hidden="true">
        <span className="tk-ambient-glow tk-ambient-glow-one" />
        <span className="tk-ambient-glow tk-ambient-glow-two" />
        <span className="tk-signal tk-signal-one" />
        <span className="tk-signal tk-signal-two" />
      </div>
      <div className="tk-code-bg" aria-hidden="true">
        {COLUMNS.map((c) => (
          <Column key={c.offset} {...c} />
        ))}
      </div>
      <div className="tk-vignette" aria-hidden="true" />
      <div className="tk-scanlines" aria-hidden="true" />
    </>
  );
}
