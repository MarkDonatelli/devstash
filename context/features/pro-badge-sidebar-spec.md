# Pro Badge Sidebar Spec

## Overview

Mark the Pro-only system item types in the sidebar with a small "PRO" badge so users can see which types are part of the Pro plan.

## Requirements

- Show a "PRO" badge next to the **File** and **Image** item types in the sidebar (the Pro types from the project overview)
- Use the shadcn/ui `Badge` component, kept small and subtle so it doesn't compete with the item count
- Hide the badge when the sidebar is collapsed to icon mode
- Keep the Pro type list in one shared constant (`src/lib/plans.ts`) so later limit checks can reuse it
- Display only: don't block or limit access (every user gets every feature during development)
- No schema change or migration

## References

- @context/project-overview.md (Items & Item Types, Monetization)
- @src/components/dashboard/NavItemTypes.tsx
- @src/components/ui/badge.tsx
