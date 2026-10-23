"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ITEM_TYPE_ICONS } from "@/lib/item-type-icons";
import { PRO_ITEM_TYPE_SLUGS } from "@/lib/plans";
import type { ItemTypeWithCount } from "@/types/item";

interface NavItemTypesProps {
  itemTypes: ItemTypeWithCount[];
}

export function NavItemTypes({ itemTypes }: NavItemTypesProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Item types</SidebarGroupLabel>
      <SidebarMenu>
        {itemTypes.map((type) => {
          const Icon = ITEM_TYPE_ICONS[type.icon] ?? File;
          const href = `/items/${type.slug}`;

          return (
            <SidebarMenuItem key={type.slug}>
              <SidebarMenuButton
                isActive={pathname === href}
                tooltip={`${type.name}s`}
                render={<Link href={href} />}
              >
                <Icon
                  className="text-(--type-color)"
                  style={{ "--type-color": type.color } as CSSProperties}
                />
                <span className="truncate">{type.name}s</span>
                {PRO_ITEM_TYPE_SLUGS.includes(type.slug) && (
                  <Badge
                    variant="outline"
                    className="h-4 px-1.5 text-[10px] tracking-wide text-muted-foreground group-data-[collapsible=icon]:hidden"
                  >
                    PRO
                  </Badge>
                )}
              </SidebarMenuButton>
              <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
