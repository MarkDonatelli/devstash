import { prisma } from "@/lib/prisma";

// Seeded demo account; the dashboard shows its data until auth is built
export const DEMO_USER_EMAIL = "demo@devstash.io";

export async function getCurrentUserId() {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });

  return user?.id ?? null;
}
