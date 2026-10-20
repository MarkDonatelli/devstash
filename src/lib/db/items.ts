import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ItemSummary } from "@/types/item";

const ITEM_SUMMARY = {
  id: true,
  title: true,
  description: true,
  contentType: true,
  content: true,
  url: true,
  fileName: true,
  fileSize: true,
  language: true,
  isFavorite: true,
  isPinned: true,
  createdAt: true,
  updatedAt: true,
  itemType: { select: { id: true, name: true, icon: true, color: true } },
  tags: { select: { name: true }, orderBy: { name: "asc" } },
  collections: {
    select: { collection: { select: { id: true, name: true } } },
    orderBy: { addedAt: "asc" },
  },
} satisfies Prisma.ItemSelect;

type ItemRow = Prisma.ItemGetPayload<{ select: typeof ITEM_SUMMARY }>;

function toItemSummary({ itemType, tags, collections, ...item }: ItemRow): ItemSummary {
  return {
    ...item,
    type: itemType,
    tags: tags.map((tag) => tag.name),
    collections: collections.map(({ collection }) => collection),
  };
}

export async function getPinnedItems(userId: string): Promise<ItemSummary[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: ITEM_SUMMARY,
  });

  return items.map(toItemSummary);
}

export async function getRecentItems(userId: string, limit: number): Promise<ItemSummary[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: ITEM_SUMMARY,
  });

  return items.map(toItemSummary);
}
