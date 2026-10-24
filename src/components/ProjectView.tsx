import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import GithubIcon from './GithubIcon';
import type { Project } from '@/types';
import { projects } from '@/data/projects';
import { useProjectReadme } from '@/hooks/useProjectReadme';
import MarkdownViewer from './MarkdownViewer';

type Mode = 'readme' | 'raw' | 'dossier';

const MODES: { id: Mode; label: string }[] = [
  { id: 'readme', label: 'README.md' },
  { id: 'raw', label: 'raw' },
  { id: 'dossier', label: 'dossier' },
];

interface Props {
  project: Project;
  onSelect: (id: string) => void;
}

export default function ProjectView({ project, onSelect }: Props) {
  const [mode, setMode] = useState<Mode>('readme');
  const readme = useProjectReadme(project);

  const index = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const repoUrl = `https://github.com/${project.repo}`;

  return (
    <article className="tk-project-view flex h-full min-h-0 flex-col overflow-hidden">
      {/* Header */}
      <header className="project-header terminal-scroll shrink-0 border-b border-tk-line px-6 pt-6 pb-4 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] break-all text-tk-dim">
              <span className="text-tk-red">$</span> cd ~/projects/{project.name}
            </p>
            <h1 className="tk-neon mt-1 font-display text-3xl font-bold tracking-tight break-words text-white md:text-4xl">
              {project.name}
            </h1>
            <p className="mt-1.5 max-w-xl text-[13px] text-[#cfcfcf]">{project.tagline}</p>
          </div>
          <span className="tk-stamp mt-2 shrink-0">{project.stamp}</span>
        </div>

        <div className="project-meta mt-4 flex flex-wrap items-center gap-2 text-xs">
          <div className="project-links flex min-w-0 flex-wrap items-center gap-2">
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-0 max-w-full items-center gap-1.5 border border-tk-line px-2.5 py-1.5 text-tk-text transition-colors hover:border-tk-red hover:text-tk-red"
          >
            <GithubIcon size={13} className="shrink-0" aria-hidden="true" /> <span className="break-all">{project.repo}</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-tk-red px-2.5 py-1.5 font-bold text-black transition-colors hover:bg-white"
            >
              Live demo <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
          {project.extraLinks?.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 border border-tk-line px-2.5 py-1.5 text-tk-dim transition-colors hover:border-tk-red hover:text-tk-red"
            >
              {l.label} <ExternalLink size={12} aria-hidden="true" />
            </a>
          ))}
          </div>
          <div className="project-technologies flex min-w-0 flex-wrap items-center gap-1.5" aria-label="Project technologies">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 border border-tk-line bg-white/[0.04] px-2 py-0.5 text-[11px] text-[#e0e0e0]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-tk-amber" aria-hidden="true" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Mode switch */}
      <div className="project-modes z-10 flex shrink-0 flex-wrap items-center gap-1 border-b border-tk-line bg-black/60 px-6 py-2 backdrop-blur-md md:px-8">
        <div role="group" aria-label="View mode" className="flex gap-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`px-2 py-1 text-[11px] tracking-wider whitespace-nowrap uppercase transition-colors ${
                mode === m.id ? 'bg-tk-red/15 text-tk-red' : 'text-tk-dim hover:text-tk-text'
              }`}
            >
              [ {m.label} ]
            </button>
          ))}
        </div>
        <SourceBadge state={readme} />
      </div>

      {/* Body */}
      <div key={mode} className="project-reader terminal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain" role="region" aria-label={`${project.name} ${mode} content`} tabIndex={0}>
      <div className="flex-1 px-6 py-6 md:px-8">
        {mode === 'dossier' ? (
          <Dossier project={project} />
        ) : readme.status === 'loading' ? (
          <p className="text-xs text-tk-dim">
            fetching README.md<span className="tk-blink">_</span>
          </p>
        ) : readme.status === 'error' ? (
          <p className="text-xs text-tk-red">
            ERR: could not load README.md.{' '}
            <a className="underline" href={repoUrl} target="_blank" rel="noreferrer">
              Open on GitHub
            </a>
          </p>
        ) : mode === 'readme' ? (
          <MarkdownViewer content={readme.content} repo={project.repo} />
        ) : (
          <RawView content={readme.content} />
        )}
      </div>

      {/* Prev / next */}
      <footer className="flex items-center justify-between border-t border-tk-line px-6 py-3 text-[11px] md:px-8">
        <button
          type="button"
          onClick={() => onSelect(prev.id)}
          className="flex items-center gap-1 text-tk-dim hover:text-tk-red"
        >
          <ChevronLeft size={14} aria-hidden="true" /> {prev.name}
        </button>
        <span className="text-tk-line">
          {index + 1} / {projects.length}
        </span>
        <button
          type="button"
          onClick={() => onSelect(next.id)}
          className="flex items-center gap-1 text-tk-dim hover:text-tk-red"
        >
          {next.name} <ChevronRight size={14} aria-hidden="true" />
        </button>
      </footer>
      </div>
    </article>
  );
}

function SourceBadge({ state }: { state: ReturnType<typeof useProjectReadme> }) {
  if (state.status !== 'ready') return null;
  const live = state.source === 'live';
  return (
    <span
      className={`ml-auto text-[10px] tracking-widest whitespace-nowrap uppercase ${live ? 'text-tk-green' : 'text-tk-amber'}`}
      title={live ? 'Fetched live from GitHub' : 'Bundled snapshot (GitHub unreachable or still loading)'}
    >
      ● {live ? 'live // github' : 'snapshot'}
    </span>
  );
}

function RawView({ content }: { content: string }) {
  const lines = content.replace(/\n$/, '').split('\n');
  return (
    <pre className="terminal-scroll overflow-x-auto border border-tk-line bg-[#080808] py-3 text-[12px] leading-relaxed">
      <code>
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/[0.03]">
            <span aria-hidden="true" className="w-12 shrink-0 pr-3 text-right text-tk-line select-none">
              {i + 1}
            </span>
            <span className="pr-4 whitespace-pre text-[#d0d0d0]">{line || ' '}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}

function Dossier({ project }: { project: Project }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_200px]">
      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-[10px] tracking-[0.25em] text-tk-dim uppercase">// summary</h2>
          <p className="text-[13px] leading-relaxed text-[#cfcfcf]">{project.description}</p>
        </section>
        <section>
          <h2 className="mb-2 text-[10px] tracking-[0.25em] text-tk-dim uppercase">// highlights</h2>
          <ul className="space-y-1.5 text-[13px] text-[#cfcfcf]">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-tk-red" aria-hidden="true">▪</span>
                {h}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <aside className="self-start border border-tk-amber/35 bg-[#0d0c0a] p-4">
        <h2 className="mb-2 text-[10px] tracking-[0.25em] text-tk-amber uppercase">stack</h2>
        <ul className="space-y-1 text-[12px] text-tk-text">
          {project.stack.map((s) => (
            <li key={s}>
              <span className="text-tk-dim">-</span> {s}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
