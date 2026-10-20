# Current Feature

Dashboard Collections from the Database

## Status

Completed

## Goals

Replace the mock collection data on the dashboard's main area with real data from Neon via Prisma (see @context/features/dashboard-collections-spec.md). Items below the collections stay on mock data for now.

- `src/lib/db/collections.ts` with the data fetching functions for collections
- The dashboard page (a server component) fetches the collections directly
- Recent collections show the **6** most recently updated collections, in the existing `CollectionCard` design
- Each card's color (tint and border) comes from the item type that is most common among its items, falling back to the collection's `defaultType`
- Each card shows small icons for every item type in that collection, plus its item count
- The "Collections" and "Favorite collections" stats and the "Recent collections" count come from the database

## Notes

- There's no auth yet, so the data belongs to the demo user, looked up by `DEMO_USER.email` from `prisma/seed-data.ts`. This is replaced by the session user once auth is built
- The query loads only each item's type (id, name, icon, color), not item content; type ranking happens in `src/lib/db/collections.ts`
- `/dashboard` calls `connection()` so it renders per request; without Cache Components a database query in the page would otherwise run once at build time
- `CollectionCard` takes props shaped for the card rather than mock-data types, so it doesn't depend on `src/lib/mock-data.ts`
- The "Items" and "Favorite items" stats, pinned items, recent items and the sidebar keep using mock data until their own phases
- No pinned/recent items, sidebar or `/items/[type]` changes in this feature
- The spec's screenshot reference (`context/screenshots/dashboard-ui-main.png`) doesn't exist; the current design is the reference

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
- **Dashboard Collections from the Database** — recent collections (6, 3-column grid) and collection stats on `/dashboard` load from Neon via `src/lib/db/collections.ts`; card color from the most common item type, type icons per collection; demo user via `src/lib/db/users.ts` until auth; page renders per request with `connection()` (2026-10-20)
