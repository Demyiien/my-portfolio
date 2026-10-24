import { ChevronRight, FolderGit2, UserRound } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import type { View } from '@/types';

interface Props {
  view: View;
  onNavigate: (view: View) => void;
  projectsOpen: boolean;
  onToggleProjects: () => void;
}

const itemBase =
  'tk-nav-item group flex w-full items-center gap-2.5 border-l-2 px-3 py-2.5 text-left text-[12px]';
const itemIdle = 'border-transparent text-tk-dim hover:border-tk-line hover:bg-white/[0.03] hover:text-tk-text';
const itemActive = 'border-tk-red bg-tk-red/[0.08] text-tk-text';

export default function Sidebar({ view, onNavigate, projectsOpen, onToggleProjects }: Props) {
  const aboutActive = view.kind === 'about';

  return (
    <nav
      aria-label="Portfolio sections"
      className="tk-sidebar terminal-scroll flex shrink-0 flex-col overflow-y-auto border-b border-tk-line md:w-56 md:border-r md:border-b-0 max-md:max-h-[38%]"
    >
      <p className="px-4 pt-4 pb-2 text-[10px] tracking-[0.25em] text-tk-dim uppercase">~/portfolio</p>

      <ul className="space-y-0.5">
        <li>
          <button
            type="button"
            onClick={() => onNavigate({ kind: 'about' })}
            aria-current={aboutActive ? 'page' : undefined}
            className={`${itemBase} ${aboutActive ? itemActive : itemIdle}`}
          >
            <UserRound size={15} className={aboutActive ? 'text-tk-red' : ''} aria-hidden="true" />
            <span>about_me</span>
            <span className="ml-auto text-[10px] text-tk-dim">/whoami</span>
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={onToggleProjects}
            aria-expanded={projectsOpen}
            aria-controls="project-list"
            className={`${itemBase} ${view.kind === 'project' ? 'border-tk-red/50 text-tk-text' : itemIdle}`}
          >
            <FolderGit2 size={15} className={view.kind === 'project' ? 'text-tk-red' : ''} aria-hidden="true" />
            <span>projects</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-tk-dim">
              {projects.length}
              <ChevronRight
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${projectsOpen ? 'rotate-90 text-tk-red' : ''}`}
              />
            </span>
          </button>

          <div className="tk-collapse" data-open={projectsOpen}>
            <div inert={!projectsOpen}>
              <ul id="project-list" className="relative ml-5 border-l border-dashed border-tk-line py-1">
                {projects.map((p) => {
                  const active = view.kind === 'project' && view.id === p.id;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate({ kind: 'project', id: p.id })}
                        aria-current={active ? 'page' : undefined}
                        className={`tk-project-link flex w-full items-center gap-2 py-2 pr-3 pl-3 text-left text-[11px] ${
                          active ? 'text-tk-red' : 'text-tk-dim hover:text-tk-text'
                        }`}
                      >
                        <span aria-hidden="true" className={active ? 'text-tk-red' : 'text-tk-line'}>
                          ├─
                        </span>
                        <span className="truncate">{p.name}</span>
                        {active && <span className="tk-blink ml-auto" aria-hidden="true">▌</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <div className="mt-auto hidden border-t border-tk-line p-4 text-[10px] leading-relaxed text-tk-dim md:block">
        <a
          href={profile.links[0].url}
          target="_blank"
          rel="noreferrer"
          className="mb-3 flex items-center gap-2 text-tk-text hover:text-tk-red"
        >
          <GithubIcon size={13} aria-hidden="true" /> github.com/{profile.name}
        </a>
        <p>
          <span className="text-tk-green">●</span> status: online
        </p>
        <p>loc: {profile.location}</p>
      </div>
    </nav>
  );
}
