# Current Feature

Dashboard Items from the Database

## Status

Completed

## Goals

Replace the remaining mock data in the dashboard's main area with real items from Neon via Prisma, following the pattern from the collections feature (see @context/features/dashboard-items-spec.md).

- `src/lib/db/items.ts` with the data fetching functions for items
- **Pinned items**: the demo user's pinned items (section hidden when there are none)
- **Recent items**: the 10 most recently updated items
- **Item cards and drawer**: keep the existing `ItemCard`, `ItemDetails` and `ItemDrawer` design; type icon and color, tags, collections, content/URL preview, created/updated dates all come from the database
- `ItemCard` and `ItemDetails` take props shaped for the UI (types in `src/types/item.ts`) instead of mock-data types

## Notes

- Same demo user lookup as collections (`getCurrentUserId()` in `src/lib/db/users.ts`) until auth is built
- Queries select only what the cards and drawer need: the item type summary, tag names and collection names
- Guard `new URL(item.url)` in `ItemCard` so an invalid URL can't crash the page (pending review follow-up)
- The "Items" and "Favorite items" stats, the sidebar and `/items/[type]` stay on mock data; stats and sidebar are the next feature (`stats-sidebar-spec.md`)
- No editing, creating or deleting items in this feature

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
- **Dashboard Items from the Database** — pinned and recent items on `/dashboard` (cards and drawer) load from Neon via `src/lib/db/items.ts`; `ItemCard`/`ItemDetails` take an `ItemSummary` (`src/types/item.ts`); invalid link URLs no longer crash the card (2026-10-20)
