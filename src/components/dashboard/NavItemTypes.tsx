"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { File } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ITEM_TYPE_ICONS } from "@/lib/item-type-icons";

export interface NavItemType {
  slug: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface NavItemTypesProps {
  itemTypes: NavItemType[];
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
                <span>{type.name}s</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
