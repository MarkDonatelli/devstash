import "dotenv/config";
import { collections, currentUser, items, itemTypes } from "../src/lib/mock-data";
import { prisma } from "../src/lib/prisma";

async function seedSystemTypes() {
  for (const { id, name, slug, icon, color } of itemTypes) {
    await prisma.itemType.upsert({
      where: { id },
      update: { name, slug, icon, color, isSystem: true, userId: null },
      create: { id, name, slug, icon, color, isSystem: true },
    });
  }
}

async function seedDemoUser() {
  const user = await prisma.user.upsert({
    where: { email: currentUser.email },
    update: { name: currentUser.name, image: currentUser.image, isPro: currentUser.isPro },
    create: {
      name: currentUser.name,
      email: currentUser.email,
      image: currentUser.image,
      isPro: currentUser.isPro,
    },
  });

  // Replace the demo user's content so the seed can be re-run
  await prisma.item.deleteMany({ where: { userId: user.id } });
  await prisma.collection.deleteMany({ where: { userId: user.id } });
  await prisma.tag.deleteMany({ where: { userId: user.id } });

  return user.id;
}

async function seedCollections(userId: string) {
  const collectionIds = new Map<string, string>();

  for (const { id, name, description, isFavorite, defaultTypeId, createdAt, updatedAt } of collections) {
    const collection = await prisma.collection.create({
      data: { name, description, isFavorite, defaultTypeId, userId, createdAt, updatedAt },
    });
    collectionIds.set(id, collection.id);
  }

  return collectionIds;
}

async function seedItems(userId: string, collectionIds: Map<string, string>) {
  for (const item of items) {
    await prisma.item.create({
      data: {
        title: item.title,
        description: item.description,
        contentType: item.contentType,
        content: item.content,
        url: item.url,
        fileUrl: item.fileUrl,
        fileName: item.fileName,
        fileSize: item.fileSize,
        language: item.language,
        isFavorite: item.isFavorite,
        isPinned: item.isPinned,
        lastUsedAt: item.lastUsedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        itemTypeId: item.itemTypeId,
        userId,
        collections: {
          create: item.collectionIds.flatMap((mockId) => {
            const collectionId = collectionIds.get(mockId);
            return collectionId ? [{ collectionId }] : [];
          }),
        },
        tags: {
          connectOrCreate: item.tags.map((name) => ({
            where: { userId_name: { userId, name } },
            create: { name, userId },
          })),
        },
      },
    });
  }
}

async function main() {
  await seedSystemTypes();
  const userId = await seedDemoUser();
  const collectionIds = await seedCollections(userId);
  await seedItems(userId, collectionIds);

  console.log(
    `Seeded ${itemTypes.length} item types, ${collections.length} collections and ${items.length} items for ${currentUser.email}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
