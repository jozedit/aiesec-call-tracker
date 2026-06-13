# AIESEC Call Tracker — Agent Guide

## Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | TanStack Start + React 19 | SPA routing and rendering |
| Styling | Inline `React.CSSProperties` objects | All component styles live in `src/routes/index.tsx` |
| Backend | Netlify Functions | `/api/sheets` endpoint for sheet CRUD |
| Database | Netlify Database (Postgres) + Drizzle ORM | Persistent sheet storage |
| Client state | localStorage | Call edits, assignments, active sheet, PINs |

## Key Directories

```
src/routes/index.tsx         — Entire app: all components and logic in one file
netlify/functions/sheets.ts  — API: GET/POST/DELETE /api/sheets
db/schema.ts                 — Drizzle schema (sheets table)
db/index.ts                  — Drizzle client
drizzle.config.ts            — Points migrations to netlify/database/migrations/
netlify/database/migrations/ — Auto-applied SQL migration files
```

## Data Flow

1. On mount, `App` fetches sheet list from `/api/sheets` and restores state from `localStorage`
2. Admins (Joseph, Askar) upload CSVs via the **Sheets** tab → saved to DB via `POST /api/sheets`
3. The parsed CSV is stored in `csvData` state (with `sheetName` and `sheetId`)
4. Call edits and assignments are stored in `localStorage` keyed by row index
5. Each call displays its sheet name + actual spreadsheet row number (`_idx + 2`)

## User Roles

- **Members** (Aya, Nada, Lilian): read-only access to their assigned calls; no sheet upload
- **Admins** (Joseph, Askar): full access; PIN-protected; Sheets tab for upload/management

## Coding Conventions

- All component styles use inline `React.CSSProperties` — no Tailwind class names inside components
- Style constants (`S`, `btn()`, `card()`, `inp()`, `sel()`, `lbl()`) defined near the top of `index.tsx`
- `storageGet/storageSet/storageList` use `localStorage` directly (browser-only)
- API helpers (`apiGetSheets`, `apiCreateSheet`, etc.) are plain `fetch` wrappers with try/catch

## Adding Tables

1. Add columns to `db/schema.ts`
2. Run `npx drizzle-kit generate`
3. Never run `drizzle-kit migrate` or apply SQL directly — Netlify applies migrations on deploy

## Project Overview

An interactive resume/portfolio application with an AI-powered assistant. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) |
| AI | TanStack AI with multi-provider support |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   ├── tanstack-circle-logo.png
│   └── tanstack-word-logo-white.svg  # TanStack wordmark logo (white) used in header/nav.
├── src
│   ├── components
│   │   ├── Header.tsx  # Header component.
│   │   └── HeaderNav.tsx  # Navigation sidebar template: mobile menu, Home link, add-on routes; EJS-driven for dynamic route generation.
│   ├── routes
│   │   ├── __root.tsx  # Root layout: Header, styles.
│   │   └── index.tsx  # Dashboard home: Bar, Line, Doughnut charts (revenue, users, sales).
│   ├── router.tsx  # TanStack Router setup: creates router from generated routeTree with scroll restoration.
│   └── styles.css  # Global styles: Tailwind import plus base body/code font styling.
├── .gitignore  # Template for .gitignore: node_modules, dist, .env, .netlify, .tanstack, etc.
├── AGENTS.md  # This document provides an overview of the project structure for developers and AI agents working on this codebase.
├── netlify.toml  # Netlify deployment config: build command (vite build), publish directory (dist/client), and dev server settings (port 8888, target 3000).
├── package.json  # Project manifest with TanStack Start, React 19, Vite 7, Tailwind CSS 4, and Netlify plugin dependencies; defines dev and build scripts.
├── pnpm-lock.yaml
├── tsconfig.json  # TypeScript config: ES2022 target, strict mode, @/* path alias for src/*, bundler module resolution.
└── vite.config.ts  # Vite config template: TanStack Start, React, Tailwind, Netlify plugin, and optional add-on integrations; processed by EJS.
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` - Root layout wrapping all pages
- `index.tsx` - Route for `/`
- `api.*.ts` - Server API endpoints (e.g., `api.resume-chat.ts` → `/api/resume-chat`)

### Component Architecture

**UI Primitives** (`src/components/ui/`):
- Radix UI-based, Tailwind-styled
- Card, Badge, Checkbox, Separator, HoverCard

**Feature Components** (`src/components/`):
- Header, HeaderNav, ResumeAssistant

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind, Content Collections |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `content-collections.ts` | Zod schemas for jobs and education frontmatter |
| `styles.css` | Tailwind imports + CSS custom properties (oklch colors) |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Zod for runtime validation
- Type-only imports with `type` keyword

### State Management
- React hooks for local state
- Zustand if you need it for global state
### Chart.js Dashboard

Analytics dashboard with Chart.js and react-chartjs-2.

**Dependencies:** chart.js, react-chartjs-2

**Chart types:**
- Bar - Revenue by month
- Line - User growth
- Doughnut - Sales by category

**Setup:** Register Chart.js components before use (CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler).

## Application Name

This starter uses "Application Name" as a placeholder throughout the UI and metadata. Replace it with the user's desired application name in the following locations:

### UI Components
- `src/components/Header.tsx` — app name displayed in the header
- `src/components/HeaderNav.tsx` — app name in the mobile navigation header

### SEO Metadata
- `src/routes/__root.tsx` — the `title` field in the `head()` configuration

Search for all occurrences of "Application Name" in the `src/` directory and replace with the user's application name.
