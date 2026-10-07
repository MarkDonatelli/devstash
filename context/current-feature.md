# Current Feature

Dashboard UI Phase 2

## Status

Completed

## Goals

- Collapsible sidebar, with a drawer icon to open/close it
- Item types listed with links to `/items/[type]` (e.g. `/items/snippets`)
- Favorite collections
- Most recent collections
- User avatar area at the bottom
- Always a drawer on mobile

## Notes

- Phase 2 of 3. Full spec: @context/features/dashboard-phase-2-spec.md
- Builds on phase 1 (@context/features/dashboard-phase-1-spec.md); main area content is phase 3 (@context/features/dashboard-phase-3-spec.md)
- Visual reference: @context/screenshots/desktop-ui-top.png (mobile: @context/screenshots/mobile-ui.png)
- Data comes from @src/lib/mock-data.ts, imported directly until the database is implemented
- Dashboard layout lives in the `(dashboard)` route group so `/dashboard` and `/items/*` share the sidebar and top bar

## History

- **Initial Next.js Setup** — Create Next App scaffold, moved to `src/`, boilerplate removed, context files added, pushed to GitHub (2026-10-06)
- **Dashboard Mock Data** — `src/lib/mock-data.ts` with current user, item types, collections and items for the dashboard UI (2026-10-07)
- **Dashboard UI Phase 1** — shadcn/ui setup, dark mode by default, `/dashboard` layout with top bar (search, New collection, New item) and Sidebar/Main placeholders (2026-10-07)
- **Dashboard UI Phase 2** — collapsible sidebar (icon mode, mobile drawer) with item type links and counts, favorite/recent collections and user area; dashboard moved into `(dashboard)` route group with placeholder `/items/[type]` page (2026-10-07)
