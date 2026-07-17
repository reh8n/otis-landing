# Otis public landing site

The standalone public marketing site for Otis. It runs on vinext and
Cloudflare Workers, with a dedicated D1 database for waitlist signups.

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm install
npm run db:generate
npm run dev
```

The local Cloudflare runtime reads the logical `DB` binding from
`.openai/hosting.json`. The waitlist endpoint also creates its table
idempotently for local previews; the checked-in Drizzle migration remains the
source of truth for deployment.

Copy `.env.example` to `.env.local` only if future environment values are
added. The current waitlist requires no secrets.

## Database

`waitlist_signups` stores:

- `id`: generated UUID
- `normalized_email`: lowercase, trimmed email with a unique constraint
- `original_email`: trimmed email as submitted
- `created_at`: database timestamp
- `source`: optional campaign or form location

Generate a migration after any schema update:

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

## Deployment requirements

- Node.js `>=22.13.0`
- Cloudflare Worker-compatible ESM output
- a dedicated D1 database bound to `DB`
- generated SQL migrations under `drizzle/`

The deployment platform provisions the physical D1 resource from the logical
binding in `.openai/hosting.json` and applies the checked-in migration.
