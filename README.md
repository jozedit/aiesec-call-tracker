# AIESEC Call Tracker — Vercel Deployment

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Vercel Postgres database
1. Go to [vercel.com](https://vercel.com) → your project → **Storage** tab
2. Click **Create Database** → choose **Postgres**
3. Connect it to your project — Vercel auto-adds the env vars (`POSTGRES_URL` etc.)

### 3. Run database migrations
```bash
# Push the schema to your Vercel Postgres database
npx drizzle-kit push
```

### 4. Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Or connect your GitHub repo on vercel.com for automatic deploys.

### 5. Local development
```bash
# Pull env vars from Vercel (needs vercel CLI linked)
vercel env pull .env.local

# Start dev server
npm run dev
# API routes available at http://localhost:3000/api/sheets
```

## Environment variables (set automatically by Vercel Postgres)
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Project structure
```
├── api/
│   └── sheets.ts          # Vercel serverless API (replaces Netlify function)
├── db/
│   ├── index.ts           # Drizzle ORM with @vercel/postgres
│   └── schema.ts          # Database schema
├── src/
│   ├── main.tsx           # React entry point
│   └── App.tsx            # Full app (all components)
├── index.html
├── vite.config.ts
├── vercel.json            # SPA rewrites + API routing
└── drizzle.config.ts
```

## What changed from Netlify version
| Netlify | Vercel |
|---|---|
| `@netlify/database` | `@vercel/postgres` |
| `drizzle-orm/netlify-db` | `drizzle-orm/vercel-postgres` |
| `netlify/functions/sheets.ts` | `api/sheets.ts` |
| `@netlify/vite-plugin-tanstack-start` | Plain `@vitejs/plugin-react` |
| `netlify.toml` | `vercel.json` |
| TanStack Start routing | Plain React SPA |
