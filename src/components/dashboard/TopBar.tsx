import { FolderPlus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:gap-4 md:px-6">
      <SidebarTrigger />
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search your stash..." className="pr-12 pl-8" />
        <Kbd className="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" aria-label="New collection">
          <FolderPlus data-icon="inline-start" />
          <span className="hidden sm:inline">New collection</span>
        </Button>
        <Button aria-label="New item">
          <Plus data-icon="inline-start" />
          <span className="hidden sm:inline">New item</span>
        </Button>
      </div>
    </header>
  );
}
