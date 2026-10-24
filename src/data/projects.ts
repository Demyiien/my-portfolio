import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'mock-publication-folio',
    name: 'mock-publication-folio',
    repo: 'Demyiien/mock-publication-folio',
    tagline: 'A digital literary & artistic folio with a print-inspired editorial layout.',
    description:
      'A curated showcase for prose, poetry, essays, and visual art. It has a magazine-style masthead, a manifesto hero, filterable catalog, and a distraction-free reader modal.',
    language: 'TypeScript',
    technologies: ['TypeScript', 'React', 'Vite', 'CSS', 'HTML', 'Design Tokens'],
    stack: ['React', 'TypeScript', 'Vite', 'Modular CSS'],
    highlights: [
      'Editorial structure: Masthead, HeroManifesto, Colophon',
      'Catalog filtering via a custom useFolioCatalog hook',
      'Reader modal with pull quotes and author bylines',
      'Light / dark themes driven by CSS design tokens',
    ],
    liveUrl: 'https://mock-publication-folio.vercel.app',
    stamp: 'PROPOSAL',
  },
  {
    id: 'jee-ply',
    name: 'jee.ply',
    repo: 'Demyiien/jee.ply',
    tagline: 'Cebu jeepney transit finder & fare calculator (Mobile-Only).',
    description:
      'A mobile-first commuter web app tailored for handheld transit navigation across Metro Cebu. Built with Leaflet.js interactive mapping, pin-drop origin/destination routing with detours, official LTFRB fare calculation via Haversine distance, and the Manong AI chathead assistant.',
    language: 'JavaScript',
    technologies: ['JavaScript', 'Leaflet.js', 'OpenStreetMap', 'Haversine GIS', 'CSS', 'HTML', 'PWA / Mobile'],
    stack: ['JavaScript', 'Leaflet.js', 'OpenStreetMap', 'Haversine GIS', 'Mobile Web'],
    highlights: [
      '📱 Exclusively optimized for mobile viewports & touch gestures',
      'Interactive Leaflet.js map bounded to Metro Cebu with waypoint detours',
      'LTFRB regulated fare calculation (₱13 base + ₱1.80/km)',
      'Interactive Manong AI transit chathead for live route guidance',
    ],
    liveUrl: 'https://jee-ply.vercel.app',
    stamp: 'HACKATHON',
  },
  {
    id: 'ragit',
    name: 'RagIT',
    repo: 'Realwaan/RagIT',
    tagline: 'Document analysis & compliance verification with Retrieval-Augmented Generation.',
    description:
      'An AI document intelligence platform that parses documents into a structured hierarchy, retrieves evidence with hybrid search, and produces answers grounded in the source material.',
    language: 'Python',
    technologies: ['Python', 'FastAPI', 'LanceDB', 'BM25 Hybrid Search', 'OpenAI / Gemini', 'PyPDF', 'JavaScript', 'HTML'],
    stack: ['Python', 'FastAPI', 'RAG', 'Hybrid Search', 'LLMs'],
    highlights: [
      'Hierarchical document parsing & visual extraction',
      'Hybrid semantic + keyword retrieval',
      'Evidence-backed answers with discrepancy scanning',
      'Compliance audits with exportable reports',
    ],
    extraLinks: [
      {
        label: 'Video Demo',
        url: 'https://drive.google.com/file/d/1zEAHLUBQRsciH8jUzL3Y6cntQAPC_rIy/view?usp=sharing',
      },
      { label: 'Slides', url: 'https://ragit-astrag-jit.lovable.app/' },
    ],
    stamp: 'HACKATHON',
  },
  {
    id: 'fconvert',
    name: 'fconvert',
    repo: 'Demyiien/fconvert',
    tagline: 'A command-line converter for audio, video, and images.',
    description:
      'A Windows-friendly CLI (fconvert /help) backed by ffmpeg. It uses a pluggable converter registry, so adding a new file type takes one subclass.',
    language: 'Python',
    technologies: ['Python', 'FFmpeg', 'Pillow', 'Windows CLI', 'Batch'],
    stack: ['Python', 'ffmpeg', 'CLI'],
    highlights: [
      'One converter per file type (audio, video, image)',
      'Extensible BaseConverter + ALL_CONVERTERS registry',
      'Outputs beside the source or to a custom /out',
      'Runs from anywhere once added to PATH',
    ],
    stamp: 'CLI TOOL',
  },
  {
    id: 'the-technologian-system-proposal',
    name: 'the-technologian-system',
    repo: 'Demyiien/the-technologian-system',
    tagline: 'One Newsroom, One Workflow — Full-stack editorial management system for TTSP.',
    description:
      'A comprehensive digital operations platform for The Technologian Student Press. Manages editorial lifecycles across Newsroom, Writing, Creatives, Online Digital, Tasks, Calendar, and Requests, with an Express.js backend and PostgreSQL relational database.',
    language: 'JavaScript',
    technologies: ['JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'HTML5', 'CSS3', 'REST API', 'Vercel'],
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'Vanilla JS', 'Vercel'],
    highlights: [
      'Multi-desk workflows: Newsroom, Creatives, Writing, and Online Digital',
      'PostgreSQL schema for drafts, staff roles, and task matrices',
      'Express.js serverless REST API deployed on Vercel',
      'Interactive publication schedule calendar and notification stream',
    ],
    liveUrl: 'https://the-technologian-system.vercel.app',
    stamp: 'SYSTEM PROPOSAL',
  },
  {
    id: 'tuo-unesco',
    name: 'TUO-Unesco',
    repo: 'Demyiien/TUO-Unesco',
    tagline: 'A Chrome extension that flags misleading statements on any webpage and shows sources.',
    description:
      'TUO scrapes the page you are reading, sends new text to a local Express backend for an LLM fact-check, and highlights suspicious phrases in place. Hovering a highlight shows related search results and asks for your TRUE / FALSE verdict before revealing the AI verdict and credibility score.',
    language: 'JavaScript',
    technologies: ['JavaScript', 'Chrome Extension (MV3)', 'Node.js', 'Express 5', 'OpenRouter · GPT-4o mini', 'Serper Search API'],
    stack: ['Chrome MV3', 'Node.js', 'Express', 'OpenRouter', 'Serper'],
    highlights: [
      'Content script scans visible text and re-scans on DOM changes (rate-limited)',
      'LLM fact-check with JSON-schema output: phrase, verdict, credibility 0–10',
      'Top 3 Google results attached to every flagged phrase via Serper',
      'In-page highlight tooltip with user TRUE / FALSE vote vs. AI verdict',
    ],
    stamp: 'HACKATHON | EXTENSION',
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);

export const selectedProjects = ['ragit', 'jee-ply', 'fconvert'].flatMap((id) =>
  projects.filter((project) => project.id === id),
);
