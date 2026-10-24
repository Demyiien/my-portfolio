import { useEffect, useState } from 'react';
import type { Project, ReadmeSource, ReadmeState } from '@/types';

// Module-level cache so switching back to a project is instant.
const cache = new Map<string, { content: string; source: ReadmeSource }>();

const snapshotUrl = (p: Project) => `${import.meta.env.BASE_URL}readmes/${p.id}.md`;
const liveUrl = (p: Project) => `https://raw.githubusercontent.com/${p.repo}/HEAD/README.md`;

async function fetchText(url: string, signal: AbortSignal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function initialState(p: Project): ReadmeState {
  const hit = cache.get(p.id);
  return hit ? { status: 'ready', ...hit } : { status: 'loading', content: '', source: null };
}

/**
 * Loads a project's README in two layers:
 *  1. the bundled snapshot in /public/readmes (fast, works offline)
 *  2. the live README from raw.githubusercontent.com (replaces the snapshot when it arrives)
 */
export function useProjectReadme(project: Project): ReadmeState {
  const [state, setState] = useState<ReadmeState>(() => initialState(project));

  useEffect(() => {
    setState(initialState(project));
    if (cache.get(project.id)?.source === 'live') return;

    const ctrl = new AbortController();
    let gotLive = false;

    const snapshot = fetchText(snapshotUrl(project), ctrl.signal).then((content) => {
      if (gotLive) return;
      cache.set(project.id, { content, source: 'snapshot' });
      setState({ status: 'ready', content, source: 'snapshot' });
    });

    const live = fetchText(liveUrl(project), ctrl.signal).then((content) => {
      gotLive = true;
      cache.set(project.id, { content, source: 'live' });
      setState({ status: 'ready', content, source: 'live' });
    });

    Promise.allSettled([snapshot, live]).then((results) => {
      if (ctrl.signal.aborted) return;
      if (results.every((r) => r.status === 'rejected')) {
        setState({ status: 'error', content: '', source: null });
      }
    });

    return () => ctrl.abort();
  }, [project]);

  return state;
}
