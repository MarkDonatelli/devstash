# Current Feature

DB Check Script

## Status

Completed

## Goals

- `scripts/check-db.ts` that connects to the database and prints the seeded demo data, to confirm `npx prisma db seed` worked
- Print the demo user (no password hash, just whether one is set), system item types, collections with item counts, items grouped by type, and tags
- Exit with an error if the demo user isn't found
- Run it with `npm run db:check`

## Notes

- Read-only: the script never writes to the database
- Uses the shared client from `src/lib/prisma.ts` and the demo email from `prisma/seed-data.ts`
- Like the seed, run it only against the Neon development branch

## History

- **Initial Next.js Setup** — Create Next App scaffold, moved to `src/`, boilerplate removed, context files added, pushed to GitHub (2026-10-06)
- **Dashboard Mock Data** — `src/lib/mock-data.ts` with current user, item types, collections and items for the dashboard UI (2026-10-07)
- **Dashboard UI Phase 1** — shadcn/ui setup, dark mode by default, `/dashboard` layout with top bar (search, New collection, New item) and Sidebar/Main placeholders (2026-10-07)
- **Dashboard UI Phase 2** — collapsible sidebar (icon mode, mobile drawer) with item type links and counts, favorite/recent collections and user area; dashboard moved into `(dashboard)` route group with placeholder `/items/[type]` page (2026-10-07)
- **Dashboard UI Phase 3** — main dashboard area with 4 stats cards, recent collections (tinted by dominant type), pinned items, 10 recent items, and a right-side drawer with full item details on card click (2026-10-07)
- **Prisma + Neon PostgreSQL Setup** — Prisma 7 with the Neon adapter, `prisma.config.ts`, initial schema (Auth.js + app models, indexes, cascade deletes), `init` migration applied to the Neon development branch, shared client in `src/lib/prisma.ts` (2026-10-08)
- **Database Seed** — `prisma/seed.ts` (run with `npx prisma db seed`) upserts the 7 system item types and replaces a demo user's collections, items and tags with the mock data; safe to re-run (2026-10-08)
- **Seed Sample Data** — `prisma/seed.ts` rewritten to seed from `prisma/seed-data.ts` per the seed spec: `demo@devstash.io` with a bcrypt-hashed password, 7 system types, and 5 collections with 18 items (snippets, prompts, commands, real-URL links); removes the old mock demo user (2026-10-20)
- **DB Check Script** — `scripts/check-db.ts` (run with `npm run db:check`) prints the seeded demo user, system types, collections, items and tags from the database; read-only (2026-10-20)
