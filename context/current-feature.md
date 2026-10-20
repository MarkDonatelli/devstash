# Current Feature

Seed Sample Data

## Status

Completed

## Goals

Rewrite `prisma/seed.ts` to seed the sample data from @context/features/seed-spec.md instead of `src/lib/mock-data.ts`.

- **Demo user**: `demo@devstash.io`, name "Demo User", password `12345678` hashed with `bcryptjs` (12 rounds), `isPro: false`, `emailVerified` set to the current date
- **System item types**: the 7 types (snippet, prompt, command, note, file, image, link) with the spec's Lucide icons and colors, `isSystem: true`, no user
- **Collections and items**:
  - **React Patterns** ("Reusable React patterns and hooks"): 3 TypeScript snippets covering custom hooks (useDebounce, useLocalStorage), component patterns (context providers, compound components) and utility functions
  - **AI Workflows** ("AI prompts and workflow automations"): 3 prompts for code review, documentation generation and refactoring help
  - **DevOps** ("Infrastructure and deployment resources"): 1 snippet (Docker / CI/CD config), 1 command (deployment script), 2 links to real documentation URLs
  - **Terminal Commands** ("Useful shell commands for everyday development"): 4 commands for git, Docker, process management and package managers
  - **Design Resources** ("UI/UX resources and references"): 4 links to real URLs for CSS/Tailwind references, component libraries, design systems and icon libraries
- Items have realistic content, descriptions and tags, and the right `contentType` (`TEXT` for snippets, prompts and commands, `URL` for links)
- Still safe to run repeatedly with `npx prisma db seed`

## Notes

- Install `bcryptjs` (plus `@types/bcryptjs` if the package doesn't ship its own types)
- Keep the existing fixed type IDs (`type_snippet`, etc.), display names ("Snippet") and plural slugs (`snippets`) so `/items/[type]` routes and the mock data still line up. The spec's lowercase names are type keys, not display names
- The seed data lives in the seed script (or a `prisma/seed-data.ts` next to it), not in `mock-data.ts`. The dashboard keeps reading from the mock data until it's wired to the database
- The demo user is matched by email. On each run its collections, items and tags are replaced
- The previous demo user (`mark@example.com`, from the mock data) is removed so it doesn't linger in the dev database
- Seed only the Neon development branch, never production

## History

- **Initial Next.js Setup** — Create Next App scaffold, moved to `src/`, boilerplate removed, context files added, pushed to GitHub (2026-10-06)
- **Dashboard Mock Data** — `src/lib/mock-data.ts` with current user, item types, collections and items for the dashboard UI (2026-10-07)
- **Dashboard UI Phase 1** — shadcn/ui setup, dark mode by default, `/dashboard` layout with top bar (search, New collection, New item) and Sidebar/Main placeholders (2026-10-07)
- **Dashboard UI Phase 2** — collapsible sidebar (icon mode, mobile drawer) with item type links and counts, favorite/recent collections and user area; dashboard moved into `(dashboard)` route group with placeholder `/items/[type]` page (2026-10-07)
- **Dashboard UI Phase 3** — main dashboard area with 4 stats cards, recent collections (tinted by dominant type), pinned items, 10 recent items, and a right-side drawer with full item details on card click (2026-10-07)
- **Prisma + Neon PostgreSQL Setup** — Prisma 7 with the Neon adapter, `prisma.config.ts`, initial schema (Auth.js + app models, indexes, cascade deletes), `init` migration applied to the Neon development branch, shared client in `src/lib/prisma.ts` (2026-10-08)
- **Database Seed** — `prisma/seed.ts` (run with `npx prisma db seed`) upserts the 7 system item types and replaces a demo user's collections, items and tags with the mock data; safe to re-run (2026-10-08)
- **Seed Sample Data** — `prisma/seed.ts` rewritten to seed from `prisma/seed-data.ts` per the seed spec: `demo@devstash.io` with a bcrypt-hashed password, 7 system types, and 5 collections with 18 items (snippets, prompts, commands, real-URL links); removes the old mock demo user (2026-10-20)
