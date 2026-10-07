# Current Feature

Dashboard UI Phase 3

## Status

Completed

## Goals

- Main dashboard area to the right of the sidebar
- 4 stats cards at the top: total items, collections, favorite items, favorite collections
- Recent collections
- Pinned items
- 10 most recent items
- Clicking an item card opens a drawer from the right with the item's full details (display only)

## Notes

- Phase 3 of 3. Full spec: @context/features/dashboard-phase-3-spec.md
- Builds on phase 1 (@context/features/dashboard-phase-1-spec.md) and phase 2 (@context/features/dashboard-phase-2-spec.md)
- Visual reference: @context/screenshots/desktop-ui-top.png and @context/screenshots/desktop-ui-bottom.png (stats cards are not in the screenshots)
- Data comes from @src/lib/mock-data.ts, imported directly until the database is implemented

## History

- **Initial Next.js Setup** — Create Next App scaffold, moved to `src/`, boilerplate removed, context files added, pushed to GitHub (2026-10-06)
- **Dashboard Mock Data** — `src/lib/mock-data.ts` with current user, item types, collections and items for the dashboard UI (2026-10-07)
- **Dashboard UI Phase 1** — shadcn/ui setup, dark mode by default, `/dashboard` layout with top bar (search, New collection, New item) and Sidebar/Main placeholders (2026-10-07)
- **Dashboard UI Phase 2** — collapsible sidebar (icon mode, mobile drawer) with item type links and counts, favorite/recent collections and user area; dashboard moved into `(dashboard)` route group with placeholder `/items/[type]` page (2026-10-07)
- **Dashboard UI Phase 3** — main dashboard area with 4 stats cards, recent collections (tinted by dominant type), pinned items, 10 recent items, and a right-side drawer with full item details on card click (2026-10-07)
