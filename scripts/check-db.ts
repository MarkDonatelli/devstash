import "dotenv/config";
import { DEMO_USER } from "../prisma/seed-data";
import { prisma } from "../src/lib/prisma";

async function printSystemTypes() {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: { _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  });

  console.log(`\nSystem item types (${types.length})`);
  for (const type of types) {
    console.log(`  ${type.name.padEnd(10)} /items/${type.slug.padEnd(10)} ${type.color}  ${type._count.items} items`);
  }
}

async function printCollections(userId: string) {
  const collections = await prisma.collection.findMany({
    where: { userId },
    include: { _count: { select: { items: true } } },
    orderBy: { createdAt: "asc" },
  });

  console.log(`\nCollections (${collections.length})`);
  for (const collection of collections) {
    const favorite = collection.isFavorite ? " ★" : "";
    console.log(`  ${collection.name}${favorite}: ${collection._count.items} items`);
  }
}

async function printItems(userId: string) {
  const items = await prisma.item.findMany({
    where: { userId },
    include: { itemType: true, tags: true },
    orderBy: [{ itemType: { name: "asc" } }, { title: "asc" }],
  });

  console.log(`\nItems (${items.length})`);
  for (const item of items) {
    const flags = [item.isPinned && "pinned", item.isFavorite && "favorite"].filter(Boolean).join(", ");
    const tags = item.tags.map((tag) => tag.name).join(", ");
    console.log(`  [${item.itemType.name}] ${item.title}${flags ? ` (${flags})` : ""}`);
    console.log(`      ${item.url ?? `${item.content?.length ?? 0} chars`} · tags: ${tags || "none"}`);
  }
}

async function printTags(userId: string) {
  const tags = await prisma.tag.findMany({ where: { userId }, orderBy: { name: "asc" } });
  console.log(`\nTags (${tags.length})`);
  console.log(`  ${tags.map((tag) => tag.name).join(", ")}`);
}

async function main() {
  const user = await prisma.user.findUnique({ where: { email: DEMO_USER.email } });

  if (!user) {
    console.error(`Demo user ${DEMO_USER.email} not found. Run \`npx prisma db seed\` first.`);
    process.exitCode = 1;
    return;
  }

  console.log(`Demo user: ${user.name} <${user.email}>`);
  console.log(`  password set: ${user.password ? "yes" : "no"} · Pro: ${user.isPro} · verified: ${user.emailVerified?.toISOString() ?? "no"}`);

  await printSystemTypes();
  await printCollections(user.id);
  await printItems(user.id);
  await printTags(user.id);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
