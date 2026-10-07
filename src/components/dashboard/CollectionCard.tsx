import type { CSSProperties } from "react";
import { File, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ITEM_TYPE_ICONS } from "@/lib/item-type-icons";
import type { Collection, ItemType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
  itemCount: number;
  dominantType: ItemType | undefined;
  types: ItemType[];
}

export function CollectionCard({ collection, itemCount, dominantType, types }: CollectionCardProps) {
  const Icon = ITEM_TYPE_ICONS[dominantType?.icon ?? ""] ?? File;

  return (
    <Card
      className="gap-4 bg-[color-mix(in_oklab,var(--type-color)_6%,var(--card))] px-4 ring-(--type-color)/25 transition-colors hover:ring-(--type-color)/60"
      style={{ "--type-color": dominantType?.color ?? "#6b7280" } as CSSProperties}
    >
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg bg-(--type-color)/15 text-(--type-color)">
          <Icon className="size-5" />
        </span>
        <Star
          className={cn(
            "size-4",
            collection.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          )}
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate font-medium">{collection.name}</h3>
        {collection.description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{collection.description}</p>
        )}
      </div>
      <div className="mt-auto flex items-center justify-between border-t pt-3">
        <span className="text-xs text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
        <div className="flex gap-1">
          {types.map((type) => {
            const TypeIcon = ITEM_TYPE_ICONS[type.icon] ?? File;
            return (
              <span
                key={type.id}
                title={type.name}
                className="flex size-6 items-center justify-center rounded-md bg-(--icon-color)/15 text-(--icon-color)"
                style={{ "--icon-color": type.color } as CSSProperties}
              >
                <TypeIcon className="size-3.5" />
              </span>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
