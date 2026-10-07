# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links, and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, Next core-web-vitals + TypeScript rules)
- `npx tsc --noEmit` — type-check only

No test framework is set up yet.

## Stack

- Next.js 16 (App Router) with React 19 and TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/postcss` — configured in CSS (`@import "tailwindcss"` / `@theme` in `src/app/globals.css`), there is no `tailwind.config.js`

## Structure

- App code lives under `src/` (the app was moved from the root `app/` into `src/app/`); the `@/*` import alias maps to `./src/*`.
- The project has been reset to a blank slate: no fonts, no custom CSS beyond the Tailwind import, and an empty `public/`.
- Layout and page props use Next's generated global types (e.g. `LayoutProps<"/">`, `PageProps<"/...">`) rather than hand-written prop interfaces.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
