# Otis public landing site

The standalone public marketing site for Otis. It runs as a native Next.js
application on Vercel, with a Neon Postgres database for waitlist signups.

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
