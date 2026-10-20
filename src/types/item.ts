import type { ContentType } from "@/generated/prisma/enums";
import type { ItemTypeSummary } from "@/types/collection";

export interface ItemCollectionSummary {
  id: string;
  name: string;
}

export interface ItemSummary {
  id: string;
  title: string;
  description: string | null;
  contentType: ContentType;
  content: string | null;
  url: string | null;
  fileName: string | null;
  fileSize: number | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: ItemTypeSummary;
  tags: string[];
  collections: ItemCollectionSummary[];
}

export interface ItemTypeWithCount {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  count: number;
}

export interface ItemStats {
  total: number;
  favorites: number;
}
