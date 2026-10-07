import type { ReactNode } from "react";
import { Folder, FolderHeart, Layers, Star } from "lucide-react";
import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import { ItemDetails } from "@/components/dashboard/ItemDetails";
import { ItemDrawer } from "@/components/dashboard/ItemDrawer";
import { StatsCards, type Stat } from "@/components/dashboard/StatsCards";
import { collections, items, itemTypes, type Item } from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 4;
const RECENT_ITEMS_LIMIT = 10;

export default function DashboardPage() {
  const stats: Stat[] = [
    { label: "Items", value: items.length, icon: Layers },
    { label: "Collections", value: collections.length, icon: Folder },
    { label: "Favorite items", value: items.filter((item) => item.isFavorite).length, icon: Star },
    {
      label: "Favorite collections",
      value: collections.filter((collection) => collection.isFavorite).length,
      icon: FolderHeart,
    },
  ];

  const recentCollections = [...collections]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENT_COLLECTIONS_LIMIT)
    .map((collection) => {
      const collectionItems = items.filter((item) => item.collectionIds.includes(collection.id));
      const typeCounts = new Map<string, number>();
      for (const item of collectionItems) {
        typeCounts.set(item.itemTypeId, (typeCounts.get(item.itemTypeId) ?? 0) + 1);
      }
      const dominantTypeId =
        [...typeCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? collection.defaultTypeId;

      return {
        collection,
        itemCount: collectionItems.length,
        dominantType: itemTypes.find((type) => type.id === dominantTypeId),
        types: itemTypes.filter((type) => typeCounts.has(type.id)),
      };
    });

  const pinnedItems = items.filter((item) => item.isPinned);
  const recentItems = [...items]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENT_ITEMS_LIMIT);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Your stash</h1>
        <p className="mt-1 text-sm text-muted-foreground">A little less searching. A lot more building.</p>
      </div>

      <StatsCards stats={stats} />

      <Section title="Recent collections" count={collections.length}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recentCollections.map((props) => (
            <CollectionCard key={props.collection.id} {...props} />
          ))}
        </div>
      </Section>

      {pinnedItems.length > 0 && (
        <Section title="Pinned items" count={pinnedItems.length}>
          <ItemGrid items={pinnedItems} />
        </Section>
      )}

      <Section title="Recent items" count={recentItems.length}>
        <ItemGrid items={recentItems} />
      </Section>
    </div>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 font-medium">
        {title}
        <span className="rounded-md bg-muted px-1.5 text-xs text-muted-foreground tabular-nums">{count}</span>
      </h2>
      {children}
    </section>
  );
}

function ItemGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const type = itemTypes.find((t) => t.id === item.itemTypeId);
        const itemCollections = collections.filter((c) => item.collectionIds.includes(c.id));

        return (
          <ItemDrawer
            key={item.id}
            label={`Open ${item.title}`}
            trigger={<ItemCard item={item} type={type} collectionName={itemCollections[0]?.name} />}
          >
            <ItemDetails item={item} type={type} collections={itemCollections} />
          </ItemDrawer>
        );
      })}
    </div>
  );
}
