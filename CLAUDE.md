# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links, and custom types.

@AGENTS.md

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
