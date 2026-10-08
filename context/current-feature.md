# Current Feature

Database Seed

## Status

Completed

## Goals

- `prisma/seed.ts` that can be run repeatedly without duplicating data
- Seed the 7 system item types (Snippet, Prompt, Command, Note, Link, File, Image) with `isSystem: true` and no user
- Seed a demo user with the collections, items and tags from @src/lib/mock-data.ts
- Wire it up with `tsx` and a `seed` entry in `prisma.config.ts`, run with `npx prisma db seed`

## Notes

- Prisma 7 never runs seeds automatically (not after `migrate dev` either); run `npx prisma db seed` explicitly
- System types use fixed IDs matching the mock data (`type_snippet`, etc.) so they can be upserted; the `[userId, slug]` unique can't be used for upserts when `userId` is null
- The demo user is matched by email; on each run its collections, items and tags are replaced with the mock data
- The demo user has no password until auth is built
- Seed only the Neon development branch, never production

## History

- **Initial Next.js Setup** — Create Next App scaffold, moved to `src/`, boilerplate removed, context files added, pushed to GitHub (2026-10-06)
- **Dashboard Mock Data** — `src/lib/mock-data.ts` with current user, item types, collections and items for the dashboard UI (2026-10-07)
- **Dashboard UI Phase 1** — shadcn/ui setup, dark mode by default, `/dashboard` layout with top bar (search, New collection, New item) and Sidebar/Main placeholders (2026-10-07)
- **Dashboard UI Phase 2** — collapsible sidebar (icon mode, mobile drawer) with item type links and counts, favorite/recent collections and user area; dashboard moved into `(dashboard)` route group with placeholder `/items/[type]` page (2026-10-07)
- **Dashboard UI Phase 3** — main dashboard area with 4 stats cards, recent collections (tinted by dominant type), pinned items, 10 recent items, and a right-side drawer with full item details on card click (2026-10-07)
- **Prisma + Neon PostgreSQL Setup** — Prisma 7 with the Neon adapter, `prisma.config.ts`, initial schema (Auth.js + app models, indexes, cascade deletes), `init` migration applied to the Neon development branch, shared client in `src/lib/prisma.ts` (2026-10-08)
- **Database Seed** — `prisma/seed.ts` (run with `npx prisma db seed`) upserts the 7 system item types and replaces a demo user's collections, items and tags with the mock data; safe to re-run (2026-10-08)
