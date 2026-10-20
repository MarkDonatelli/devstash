import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { CollectionStats, CollectionSummary, ItemTypeSummary } from "@/types/collection";

const ITEM_TYPE_SUMMARY = { id: true, name: true, icon: true, color: true } as const;

// Item types in a collection, most common first (ties broken by name)
function rankItemTypes(types: ItemTypeSummary[]) {
  const counts = new Map<string, { type: ItemTypeSummary; count: number }>();
  for (const type of types) {
    const entry = counts.get(type.id) ?? { type, count: 0 };
    entry.count += 1;
    counts.set(type.id, entry);
  }

  return [...counts.values()]
    .sort((a, b) => b.count - a.count || a.type.name.localeCompare(b.type.name))
    .map(({ type }) => type);
}

async function findCollectionSummaries(
  where: Prisma.CollectionWhereInput,
  limit?: number,
): Promise<CollectionSummary[]> {
  const collections = await prisma.collection.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      defaultType: { select: ITEM_TYPE_SUMMARY },
      items: { select: { item: { select: { itemType: { select: ITEM_TYPE_SUMMARY } } } } },
    },
  });

  return collections.map(({ defaultType, items, ...collection }) => {
    const types = rankItemTypes(items.map(({ item }) => item.itemType));
    return { ...collection, itemCount: items.length, dominantType: types[0] ?? defaultType, types };
  });
}

export function getRecentCollections(userId: string, limit: number) {
  return findCollectionSummaries({ userId }, limit);
}

// All favorites, plus the most recently updated collections that aren't favorites
export async function getSidebarCollections(userId: string, recentLimit: number) {
  const [favorites, recent] = await Promise.all([
    findCollectionSummaries({ userId, isFavorite: true }),
    findCollectionSummaries({ userId, isFavorite: false }, recentLimit),
  ]);

  return { favorites, recent };
}

export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
}
