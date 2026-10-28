# Otis IDE landing site

The public launch page for Otis IDE, a free macOS app that runs a fleet of
Claude Code and Codex agents in parallel, each in its own worktree, branch and
port. It runs as a Next.js application on Vercel.

Every outbound link points at the public storefront repo
`reh8n/otis-ide-releases` (downloads, issues, discussions); the links live in
`lib/site.ts`. The app source is private, so never link to `reh8n/otis-ide`.

## Launch video slot

The hero shows a looping set of product screenshots. When the launch film is
ready, put it in `public/launch/` and set `launchVideo.src` (and optionally
`poster`) in `lib/site.ts`; the hero then plays the video instead.

## Screenshots

`public/product/*.jpg` are exported from `Otis-IDE/docs/media/*.png` at 1800px
and 960px wide. `public/og.png` is the 1200x630 social card.

The waitlist API from the earlier ecosystem site is still in place for existing
signups; the page no longer shows a signup form.

## Prerequisites

- Node.js 22
- a Postgres database connection in `DATABASE_URL`

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Replace the example `DATABASE_URL` in `.env.local` with a real Neon connection
string before testing successful waitlist submissions. Never commit `.env.local`.

## Database

`waitlist_signups` stores:

- `id`: generated UUID
- `normalized_email`: lowercase, trimmed email with a unique constraint
- `original_email`: trimmed email as submitted
- `created_at`: database timestamp
- `source`: optional campaign or form location

The API creates the table idempotently before inserting, while the checked-in
Drizzle migration remains the deployment source of truth.

Generate a migration after a schema change:

```bash
npm run db:generate
```

## Public API

`POST /api/waitlist`

```json
{
  "email": "person@example.com",
  "source": "hero"
}
```

Valid new and duplicate signups receive the same generic success response.
Invalid email input receives `400`; unexpected storage failures receive `500`.
Responses never disclose whether an email was already present.

## Verification

```bash
npm run test
npm run lint
npm run build
```

## Deploy to Vercel

1. Import `reh8n/otis-landing` into Vercel using the Next.js preset.
2. In the Vercel project, open **Storage** or **Marketplace** and add **Neon**.
3. Connect the Neon database to this project for Production, Preview, and
   Development. Vercel adds `DATABASE_URL` automatically.
4. In the Neon/Vercel SQL editor, run the SQL file under `drizzle/`.
5. Redeploy the latest `main` commit.

No custom build or output directory is required. Vercel should run
`npm run build` and use the native `.next` output.
