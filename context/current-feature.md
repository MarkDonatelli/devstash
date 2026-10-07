# Current Feature

Dashboard UI Phase 1

## Status

Completed

## Goals

- Initialize shadcn/ui and install the components needed for the layout
- Dashboard route at `/dashboard`
- Main dashboard layout and any global styles
- Dark mode by default
- Top bar with search, a "New collection" button and a "New item" button (display only)
- Placeholders for the sidebar and main area: an `h2` with "Sidebar" and one with "Main"

## Notes

- Phase 1 of 3. Full spec: @context/features/dashboard-phase-1-spec.md
- Sidebar is phase 2 (@context/features/dashboard-phase-2-spec.md); main area content is phase 3 (@context/features/dashboard-phase-3-spec.md)
- Visual reference: @context/screenshots/desktop-ui-top.png
- Data comes from @src/lib/mock-data.ts until the database is implemented

## History

- **Initial Next.js Setup** — Create Next App scaffold, moved to `src/`, boilerplate removed, context files added, pushed to GitHub (2026-10-06)
- **Dashboard Mock Data** — `src/lib/mock-data.ts` with current user, item types, collections and items for the dashboard UI (2026-10-07)
- **Dashboard UI Phase 1** — shadcn/ui setup, dark mode by default, `/dashboard` layout with top bar (search, New collection, New item) and Sidebar/Main placeholders (2026-10-07)
