import { Suspense } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SidebarErrorBoundary } from "@/components/dashboard/SidebarErrorBoundary";
import { SidebarSkeleton } from "@/components/dashboard/SidebarSkeleton";
import { TopBar } from "@/components/dashboard/TopBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <SidebarProvider>
      <SidebarErrorBoundary>
        <Suspense fallback={<SidebarSkeleton />}>
          <AppSidebar />
        </Suspense>
      </SidebarErrorBoundary>
      <SidebarInset className="min-w-0">
        <TopBar />
        <div className="flex-1 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
