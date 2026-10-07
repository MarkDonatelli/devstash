import Link from "next/link";
import { Archive } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavCollections, type NavCollection } from "@/components/dashboard/NavCollections";
import { NavItemTypes, type NavItemType } from "@/components/dashboard/NavItemTypes";
import { collections, currentUser, items, itemTypes } from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 5;

export function AppSidebar() {
  const navItemTypes: NavItemType[] = itemTypes.map((type) => ({
    slug: type.slug,
    name: type.name,
    icon: type.icon,
    color: type.color,
    count: items.filter((item) => item.itemTypeId === type.id).length,
  }));

  const navCollections: NavCollection[] = [...collections]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((collection) => ({
      id: collection.id,
      name: collection.name,
      isFavorite: collection.isFavorite,
      color: itemTypes.find((type) => type.id === collection.defaultTypeId)?.color ?? "#6b7280",
    }));

  const favoriteCollections = navCollections.filter((collection) => collection.isFavorite);
  const recentCollections = navCollections
    .filter((collection) => !collection.isFavorite)
    .slice(0, RECENT_COLLECTIONS_LIMIT);

  const initials = currentUser.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-black">
                <Archive className="size-4" />
              </span>
              <span className="text-base font-semibold">DevStash</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavItemTypes itemTypes={navItemTypes} />
        <NavCollections label="Favorite collections" collections={favoriteCollections} />
        <NavCollections label="Recent collections" collections={recentCollections} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8">
                {currentUser.image && <AvatarImage src={currentUser.image} alt={currentUser.name} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="grid flex-1 text-left leading-tight">
                <span className="truncate font-medium">{currentUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
