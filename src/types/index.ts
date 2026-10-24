export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  /** URL-safe id, also the README snapshot filename in /public/readmes */
  id: string;
  /** Display name (matches the repo name) */
  name: string;
  /** owner/repo on GitHub */
  repo: string;
  tagline: string;
  description: string;
  language: string;
  technologies: string[];
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  extraLinks?: ProjectLink[];
  /** Short label stamped on the project header */
  stamp: string;
}

export type View = { kind: 'about' } | { kind: 'project'; id: string };

export type ReadmeSource = 'live' | 'snapshot';

export interface ReadmeState {
  status: 'loading' | 'ready' | 'error';
  content: string;
  source: ReadmeSource | null;
}
