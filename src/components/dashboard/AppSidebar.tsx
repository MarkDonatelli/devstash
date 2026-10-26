import Link from "next/link";
import { Archive, FolderOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavCollections, type NavCollection } from "@/components/dashboard/NavCollections";
import { NavItemTypes } from "@/components/dashboard/NavItemTypes";
import { getSidebarCollections } from "@/lib/db/collections";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { getCurrentUser } from "@/lib/db/users";
import { FALLBACK_TYPE_COLOR } from "@/lib/item-type-icons";
import type { CollectionSummary } from "@/types/collection";
import type { CurrentUser } from "@/types/user";

const RECENT_COLLECTIONS_LIMIT = 5;

function toNavCollection({ id, name, isFavorite, dominantType }: CollectionSummary): NavCollection {
  return { id, name, isFavorite, color: dominantType?.color ?? FALLBACK_TYPE_COLOR };
}

export async function AppSidebar() {
  const user = await getCurrentUser();
  const [itemTypes, collections] = await Promise.all([
    getItemTypesWithCounts(user?.id ?? null),
    user ? getSidebarCollections(user.id, RECENT_COLLECTIONS_LIMIT) : { favorites: [], recent: [] },
  ]);

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
        <NavItemTypes itemTypes={itemTypes} />
        <NavCollections label="Favorite collections" collections={collections.favorites.map(toNavCollection)} />
        <NavCollections label="Recent collections" collections={collections.recent.map(toNavCollection)} />
        <SidebarGroup className="pt-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="View all collections"
                className="text-muted-foreground"
                render={<Link href="/collections" />}
              >
                <FolderOpen />
                <span>View all collections</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <UserMenu user={user} />
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}

function UserMenu({ user }: { user: CurrentUser }) {
  const name = user.name ?? user.email ?? "User";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Avatar className="size-8">
            {user.image && <AvatarImage src={user.image} alt={name} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="grid flex-1 text-left leading-tight">
            <span className="truncate font-medium">{name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
