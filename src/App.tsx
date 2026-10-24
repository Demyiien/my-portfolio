import { useEffect, useRef, useState } from 'react';
import BackgroundEffects from '@/components/BackgroundEffects';
import CursorTrail from '@/components/CursorTrail';
import Sidebar from '@/components/Sidebar';
import AboutView from '@/components/AboutView';
import ProjectView from '@/components/ProjectView';
import { getProject, projects } from '@/data/projects';
import { profile } from '@/data/profile';
import type { View } from '@/types';
import { Volume2, VolumeX } from 'lucide-react';
import { useInterfaceSound } from '@/hooks/useInterfaceSound';

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString('en-GB', { hour12: false });
}

export default function App() {
  const [view, setView] = useState<View>({ kind: 'about' });
  const [projectsOpen, setProjectsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const clock = useClock();
  const { soundEnabled, toggleSound } = useInterfaceSound();

  const navigate = (next: View) => {
    setView(next);
    if (next.kind === 'project') setProjectsOpen(true);
    contentRef.current?.scrollTo({ top: 0 });
  };

  const openProjects = () => navigate({ kind: 'project', id: projects[0].id });

  const project = view.kind === 'project' ? getProject(view.id) : undefined;
  const path = project ? `~/projects/${project.name}` : '~/about_me';

  return (
    <div className="relative flex h-dvh w-screen items-center justify-center overflow-hidden">
      <BackgroundEffects />
      <CursorTrail />

      <main
        className="tk-window relative z-10 flex h-[min(820px,92dvh)] w-[min(1240px,94vw)] flex-col overflow-hidden"
      >
        {/* Title bar */}
        <header className="tk-titlebar flex items-center gap-3 border-b border-tk-line px-4 py-3 text-[11px] text-tk-dim">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-tk-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-tk-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-tk-green/80" />
          </div>
          <span className="min-w-0 truncate">
            {profile.name.toLowerCase()}@portfolio:<span className="text-tk-text">{path}</span>
          </span>
          <button type="button" data-sound-toggle aria-pressed={soundEnabled} aria-label="Interface sounds" onClick={toggleSound} className="sound-toggle ml-auto shrink-0" title={soundEnabled ? 'Sound on · hover clicks activate after your first interaction. Click to mute.' : 'Enable interface sounds'}>
            {soundEnabled ? <Volume2 size={13} aria-hidden="true" /> : <VolumeX size={13} aria-hidden="true" />}
            <span className="hidden sm:inline">SOUND {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
          <span className="hidden shrink-0 items-center gap-3 sm:flex">
            <span>UTF-8</span>
            <span className="tk-neon tk-neon-delayed text-tk-green">● ONLINE</span>
            <time className="tabular-nums text-tk-text">{clock}</time>
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <Sidebar
            view={view}
            onNavigate={navigate}
            projectsOpen={projectsOpen}
            onToggleProjects={() => setProjectsOpen((o) => !o)}
          />

          <div ref={contentRef} className={`terminal-scroll content-pane min-h-0 min-w-0 flex-1 ${project ? 'overflow-hidden' : 'overflow-y-auto'}`}>
            {project ? (
              <ProjectView key={project.id} project={project} onSelect={(id) => navigate({ kind: 'project', id })} />
            ) : (
              <AboutView onOpenProjects={openProjects} onSelectProject={(id) => navigate({ kind: 'project', id })} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
