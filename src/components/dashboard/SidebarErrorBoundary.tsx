"use client";

import { catchError, type ErrorInfo } from "next/error";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";

// The sidebar lives in the layout, which the dashboard's error.tsx doesn't cover
function SidebarError(_props: object, { retry }: ErrorInfo) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="gap-2 group-data-[collapsible=icon]:hidden">
          <p className="text-sm text-muted-foreground">Couldn&apos;t load the sidebar.</p>
          <Button variant="outline" size="sm" onClick={() => retry()}>
            Try again
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export const SidebarErrorBoundary = catchError(SidebarError);
