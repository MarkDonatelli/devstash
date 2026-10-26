# Current Feature

Code Scan Fixes

## Status

Completed

## Goals

- Scan the codebase with the `code-scanner` subagent (`.claude/agents/code-scanner.md`)
- Review the findings and pick which ones to fix
- Fix the chosen issues and keep `npm run build` passing

## Notes

- Scope: `src/`, `prisma/`, `scripts/` and root config; `src/generated` is skipped
- No auth yet by design (demo user via `getCurrentUser()`), so it is out of scope
- Fixing everything except the dummy-data findings (`/items/[type]` mock data, seed demo password)
- Fixes: `DATABASE_URL` check, dashboard `loading.tsx`/`error.tsx`, sidebar Suspense skeleton and `catchError` boundary, http(s)-only item links, shared `FALLBACK_TYPE_COLOR`, native drawer button, `/` redirects to `/dashboard`, real metadata description, initials, named time/size constants, unknown types sort last, shared `TagList`/`FileInfo`, `next.config.ts` comment removed
- Not changed: `cache()` on collection fetchers (sidebar and page run different queries, nothing to dedupe); collection links (need the collections pages)

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
- **Stats & Sidebar from the Database** — all 4 dashboard stats, sidebar item types (icons, counts, `/items/[slug]` links), favorite/recent collections (dot colored by most-used type), "View all collections" link and the user area load from Neon; `getCurrentUser()` cached per request (2026-10-20)
- **Fix: Sidebar Item Types Without a User** — sidebar always lists the 7 system item types (counts 0 when no user is found), so a missing user no longer hides them (2026-10-20)
- **Pro Badge in Sidebar** — small "PRO" badge next to the File and Image item types in the sidebar (hidden in icon mode); Pro type slugs in `src/lib/plans.ts`; display only, no limits enforced (2026-10-23)
- **Code Scan Fixes** — `code-scanner` subagent added; fixed its findings except dummy data: `DATABASE_URL` check, dashboard loading/error states with a sidebar skeleton and error boundary, http(s)-only item links, native drawer button, shared `TagList`/`FileInfo` and fallback color, `/` redirects to `/dashboard`, named constants (2026-10-26)
