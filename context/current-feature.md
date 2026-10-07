# Current Feature

Dashboard Mock Data

## Status

In Progress

## Goals

- Single source of truth for dashboard mock data until the database is implemented
- `src/lib/mock-data.ts` with the current user, item types, collections and items
- Shape follows the draft Prisma schema in `project-overview.md` and the dashboard screenshots
- Keep it simple: plain data to import, no helper functions

## Notes

- Branch: `feature/mock-data`
- Types live in the mock data file for now; replaced by Prisma-generated types later
- Counts (items per collection/type) are not stored; the UI derives them from `items`
- `fileUrl` values for file/image items are placeholders and don't point to real files

## History

- **Initial Next.js Setup** — Create Next App scaffold, moved to `src/`, boilerplate removed, context files added, pushed to GitHub (2026-10-06)
