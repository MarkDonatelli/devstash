# Coding Standards

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for component props, API responses, and data models
- Pages and layouts use Next's generated global types (`PageProps<"/route">`, `LayoutProps<"/route">`) instead of hand-written prop interfaces
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js

- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- Use Server Actions for form submissions and simple mutations
- Use Route Handlers (`route.ts`) when you need:
  - Webhooks (Stripe, GitHub, etc.)
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Otherwise, fetch data directly in server components
- Dynamic routes for item/collection pages
- Request interception (e.g. auth route protection) goes in `src/proxy.ts`. Next 16 renamed `middleware.ts` to `proxy.ts`; do not create `middleware.ts`

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed
- Dark mode is class-based (dark by default, light optional), so `globals.css` must define the `dark` variant with `@custom-variant`. Without it, `dark:` follows the OS setting

Example v4 configuration:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization

- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`

## Naming

- Components: PascalCase (`ItemCard.tsx`). Exception: shadcn/ui components in `src/components/ui/` keep shadcn's kebab-case names (`button.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- Tailwind CSS for all styling
- Use shadcn/ui components where applicable
- No inline styles. Exception: runtime values from the database (e.g. item type colors) are passed as a CSS variable, `style={{ "--type-color": color }}`, and consumed with Tailwind classes like `border-(--type-color)`
- Dark mode first, light mode as option

## Database

- Use Prisma ORM for all database operations
- Always use `prisma migrate dev` for schema changes (not `db push`)
- Run `prisma migrate status` before committing to verify migrations are in sync
- Production deployments must run `prisma migrate deploy` before the app starts

## Data Fetching

- Server components fetch directly with Prisma
- Server components fetch data and pass it to client components as props
- Client components use Server Actions for mutations only, not for reading data
- Validate all inputs with Zod (not installed yet; add it with the first form)

## Error Handling

- Use try/catch in Server Actions
- Call `redirect()` and `notFound()` outside the `try` block. They work by throwing, so a `catch` swallows them
- Return `{ success, data, error }` pattern from actions
- Display user-friendly error messages via toast

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible
