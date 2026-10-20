export interface ItemTypeSummary {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  // Most common item type in the collection, or its default type when empty
  dominantType: ItemTypeSummary | null;
  // Every item type in the collection, most common first
  types: ItemTypeSummary[];
}

export interface CollectionStats {
  total: number;
  favorites: number;
}
