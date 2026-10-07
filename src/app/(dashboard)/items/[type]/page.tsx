import { notFound } from "next/navigation";
import { itemTypes } from "@/lib/mock-data";

export default async function ItemTypePage({ params }: PageProps<"/items/[type]">) {
  const { type } = await params;
  const itemType = itemTypes.find((t) => t.slug === type);

  if (!itemType) notFound();

  return <h2 className="text-sm font-medium text-muted-foreground">{itemType.name}s</h2>;
}
