# AIESEC Call Tracker

A call-tracking web application for AIESEC teams. Members can view their assigned calls and log contact outcomes. Admins (Joseph and Askar) can upload Google Sheet exports, manage multiple sheets, assign calls to members, and view team performance analytics.

## Key Technologies

- **TanStack Start** — full-stack React framework with file-based routing
- **Tailwind CSS v4** — utility-first styling (used in root, app uses inline styles)
- **Netlify Database** — managed Postgres via `@netlify/database` + Drizzle ORM
- **Netlify Functions** — serverless API endpoint for sheet CRUD (`/api/sheets`)
- **localStorage** — client-side persistence for call edits, assignments, and active sheet

## How to Run Locally

```bash
npm install
netlify dev
```

Open [http://localhost:8888](http://localhost:8888).

### Login credentials

- **Members** (Aya, Nada, Lilian) — click name, no PIN required
- **Admins** (Joseph, Askar) — click name, default PIN: `1234`

Admins can upload CSV sheets from the **Sheets** tab after logging in.
