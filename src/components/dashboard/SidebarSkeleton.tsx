import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = 7;

export function SidebarSkeleton() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Skeleton className="h-12 rounded-lg" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {Array.from({ length: SKELETON_ROWS }, (_, index) => (
              <SidebarMenuItem key={index}>
                <Skeleton className="h-8" />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
