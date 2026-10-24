# Mock Publication Folio

A modern, digital literary and artistic folio web application built with React, TypeScript, and Vite. This platform serves as a curated digital showcase designed to highlight creative works—including prose, poetry, essays, and visual art—in an immersive, print-inspired editorial layout.

## ✨ Features

- **Editorial Layout & Design**: Includes a classic publication structure featuring a `Masthead`, `HeroManifesto`, and `Colophon` for an authentic magazine/folio feel.
- **Interactive Catalog & Filtering**: Browse entries effortlessly using the `FilterBar` and `FilterPill` system powered by the custom `useFolioCatalog` hook.
- **Distraction-Free Reader Modal**: Click into any piece to open the `ReaderModal`, complete with formatted `PullQuote` highlights and `AuthorByline` credits.
- **Adaptive Theme Support**: Seamlessly switch between light and dark reading modes using the `useTheme` hook and custom CSS design tokens (`tokens.css`), complete with dynamic inverted branding (`ttsp-logo.png` & `ttsp-logo-inverted.png`).
- **Responsive & Modular UI**: Built with reusable UI primitives (`Badge`, `Button`, `MetaItem`, `SectionHeader`, `BackToTop`) and clean, modular stylesheets.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Custom Modular CSS (`tokens.css`, `base.css`, `layout.css`, `components.css`)

## 📂 Project Structure

```text
mock-publication-folio/
├── public/
│   ├── ttsp-logo.png
│   └── ttsp-logo-inverted.png
├── src/
│   ├── assets/images/          # Brand and publication logos
│   ├── components/
│   │   ├── folio/              # Core publication views (FolioCard, ReaderModal, PullQuote, AuthorByline)
│   │   ├── layout/             # Page structure (Masthead, HeroManifesto, FilterBar, Colophon)
│   │   └── ui/                 # Reusable UI elements (Badge, Button, FilterPill, MetaItem, etc.)
│   ├── data/
│   │   └── folioEntries.ts     # Static dataset of literary and artistic entries
│   ├── hooks/
│   │   ├── useFolioCatalog.ts  # State & filtering logic for folio entries
│   │   └── useTheme.ts         # Light/Dark mode theme management
│   ├── styles/                 # Design tokens and component styles
│   ├── types/
│   │   └── folio.ts            # TypeScript interfaces for entries and metadata
│   ├── App.tsx                 # Main application view
│   └── main.tsx                # Application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository or extract the project files:
   ```bash
   cd mock-publication-folio
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL shown in your terminal (typically `http://localhost:5173`).

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```
