import type { CSSProperties } from "react";
import { ExternalLink, File, Folder, Pin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatFileSize, formatRelativeTime } from "@/lib/format";
import { ITEM_TYPE_ICONS } from "@/lib/item-type-icons";
import type { Item, ItemType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  type: ItemType | undefined;
  collectionName: string | undefined;
}

export function ItemCard({ item, type, collectionName }: ItemCardProps) {
  const Icon = ITEM_TYPE_ICONS[type?.icon ?? ""] ?? File;

  return (
    <Card
      className="gap-3 px-4 ring-(--type-color)/30 transition-colors hover:ring-(--type-color)/70"
      style={{ "--type-color": type?.color ?? "#6b7280" } as CSSProperties}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-(--type-color)">
          <Icon className="size-3.5" />
          {type?.name}
        </span>
        <div className="flex items-center gap-2 text-muted-foreground">
          {item.isPinned && <Pin className="size-3.5" />}
          <Star className={cn("size-3.5", item.isFavorite && "fill-yellow-400 text-yellow-400")} />
        </div>
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-medium">{item.title}</h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        )}
      </div>

      <ItemPreview item={item} />

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-md font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        <span className="flex min-w-0 items-center gap-1.5">
          <Folder className="size-3.5 shrink-0" />
          <span className="truncate">{collectionName ?? "No collection"}</span>
        </span>
        <span className="shrink-0">{formatRelativeTime(item.updatedAt)}</span>
      </div>
    </Card>
  );
}

function ItemPreview({ item }: { item: Item }) {
  if (item.contentType === "URL" && item.url) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        <ExternalLink className="size-3.5 shrink-0" />
        <span className="truncate">{new URL(item.url).hostname}</span>
      </div>
    );
  }

  if (item.contentType === "FILE" && item.fileName) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
        <File className="size-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">{item.fileName}</p>
          {item.fileSize !== null && (
            <p className="text-xs text-muted-foreground">{formatFileSize(item.fileSize)}</p>
          )}
        </div>
      </div>
    );
  }

  if (item.content) {
    return (
      <pre className="line-clamp-6 overflow-hidden rounded-lg bg-muted/50 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
        {item.content}
      </pre>
    );
  }

  return null;
}
