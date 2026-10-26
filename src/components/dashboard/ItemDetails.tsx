import type { CSSProperties, ReactNode } from "react";
import { ExternalLink, File, Folder, Pin, Star } from "lucide-react";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FileInfo } from "@/components/dashboard/FileInfo";
import { TagList } from "@/components/dashboard/TagList";
import { formatRelativeTime } from "@/lib/format";
import { ITEM_TYPE_ICONS } from "@/lib/item-type-icons";
import { isHttpUrl } from "@/lib/url";
import type { ItemSummary } from "@/types/item";

interface ItemDetailsProps {
  item: ItemSummary;
}

export function ItemDetails({ item }: ItemDetailsProps) {
  const { type, collections } = item;
  const Icon = ITEM_TYPE_ICONS[type.icon] ?? File;

  return (
    <div style={{ "--type-color": type.color } as CSSProperties}>
      <SheetHeader className="border-b pr-12">
        <span className="flex items-center gap-1.5 text-xs font-medium text-(--type-color)">
          <Icon className="size-3.5" />
          {type.name}
          {item.isPinned && <Pin className="ml-2 size-3.5 text-muted-foreground" />}
          {item.isFavorite && <Star className="size-3.5 fill-yellow-400 text-yellow-400" />}
        </span>
        <SheetTitle className="text-xl">{item.title}</SheetTitle>
        {item.description && <SheetDescription>{item.description}</SheetDescription>}
      </SheetHeader>

      <div className="flex flex-col gap-6 p-4">
        {item.content && (
          <Field label={item.language ? `Content · ${item.language}` : "Content"}>
            <pre className="overflow-x-auto rounded-lg bg-muted/50 p-4 font-mono text-xs leading-relaxed">
              {item.content}
            </pre>
          </Field>
        )}

        {item.url && (
          <Field label="URL">
            {isHttpUrl(item.url) ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-(--type-color) hover:underline"
              >
                {item.url}
                <ExternalLink className="size-3.5" />
              </a>
            ) : (
              <p className="text-sm break-all text-muted-foreground">{item.url}</p>
            )}
          </Field>
        )}

        {item.fileName && (
          <Field label="File">
            <FileInfo fileName={item.fileName} fileSize={item.fileSize} />
          </Field>
        )}

        {item.tags.length > 0 && (
          <Field label="Tags">
            <TagList tags={item.tags} />
          </Field>
        )}

        <Field label="Collections">
          {collections.length > 0 ? (
            <ul className="flex flex-col gap-1.5">
              {collections.map((collection) => (
                <li key={collection.id} className="flex items-center gap-2 text-sm">
                  <Folder className="size-3.5 text-muted-foreground" />
                  {collection.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Not in any collection</p>
          )}
        </Field>

        <dl className="grid grid-cols-2 gap-4 border-t pt-4 text-xs">
          <div>
            <dt className="text-muted-foreground">Created</dt>
            <dd className="mt-1">{formatRelativeTime(item.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Updated</dt>
            <dd className="mt-1">{formatRelativeTime(item.updatedAt)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</h3>
      {children}
    </section>
  );
}
