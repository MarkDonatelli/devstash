import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavCollection {
  id: string;
  name: string;
  color: string;
  isFavorite: boolean;
}

interface NavCollectionsProps {
  label: string;
  collections: NavCollection[];
}

export function NavCollections({ label, collections }: NavCollectionsProps) {
  if (collections.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {collections.map((collection) => (
          <SidebarMenuItem key={collection.id}>
            <SidebarMenuButton tooltip={collection.name}>
              <span
                className="flex size-4 shrink-0 items-center justify-center"
                style={{ "--type-color": collection.color } as CSSProperties}
              >
                <span className="size-2 rounded-full bg-(--type-color)" />
              </span>
              <span>{collection.name}</span>
              {collection.isFavorite && (
                <Star className="ml-auto fill-yellow-400 text-yellow-400 group-data-[collapsible=icon]:hidden" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
