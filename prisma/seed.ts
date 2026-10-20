import "dotenv/config";
import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { COLLECTIONS, DEMO_USER, LEGACY_DEMO_EMAIL, SYSTEM_TYPES, type SeedItem } from "./seed-data";

async function seedSystemTypes() {
  for (const { id, name, slug, icon, color } of SYSTEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id },
      update: { name, slug, icon, color, isSystem: true, userId: null },
      create: { id, name, slug, icon, color, isSystem: true },
    });
  }
}

async function seedDemoUser() {
  await prisma.user.deleteMany({ where: { email: LEGACY_DEMO_EMAIL } });

  const { email, name, isPro } = DEMO_USER;
  const password = await hash(DEMO_USER.password, 12);
  const emailVerified = new Date();

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, password, isPro, emailVerified },
    create: { email, name, password, isPro, emailVerified },
  });

  // Replace the demo user's content so the seed can be re-run
  await prisma.item.deleteMany({ where: { userId: user.id } });
  await prisma.collection.deleteMany({ where: { userId: user.id } });
  await prisma.tag.deleteMany({ where: { userId: user.id } });

  return user.id;
}

async function createItem(item: SeedItem, userId: string, collectionId: string) {
  await prisma.item.create({
    data: {
      title: item.title,
      description: item.description,
      contentType: item.url ? "URL" : "TEXT",
      content: item.content,
      url: item.url,
      language: item.language,
      isFavorite: item.isFavorite ?? false,
      isPinned: item.isPinned ?? false,
      lastUsedAt: new Date(),
      itemTypeId: item.typeId,
      userId,
      collections: { create: { collectionId } },
      tags: {
        connectOrCreate: item.tags.map((name) => ({
          where: { userId_name: { userId, name } },
          create: { name, userId },
        })),
      },
    },
  });
}

async function seedCollections(userId: string) {
  for (const { items, ...collection } of COLLECTIONS) {
    const { id: collectionId } = await prisma.collection.create({
      data: { ...collection, isFavorite: collection.isFavorite ?? false, userId },
    });

    for (const item of items) {
      await createItem(item, userId, collectionId);
    }
  }
}

async function main() {
  await seedSystemTypes();
  const userId = await seedDemoUser();
  await seedCollections(userId);

  const itemCount = COLLECTIONS.reduce((total, { items }) => total + items.length, 0);
  console.log(
    `Seeded ${SYSTEM_TYPES.length} item types, ${COLLECTIONS.length} collections and ${itemCount} items for ${DEMO_USER.email}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
