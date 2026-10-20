import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { CurrentUser } from "@/types/user";

// Seeded demo account; the dashboard shows its data until auth is built
export const DEMO_USER_EMAIL = "demo@devstash.io";

// Cached per request so the layout and page share one query
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  return prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true, name: true, email: true, image: true },
  });
});
