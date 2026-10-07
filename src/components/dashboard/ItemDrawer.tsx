"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface ItemDrawerProps {
  label: string;
  trigger: ReactNode;
  children: ReactNode;
}

export function ItemDrawer({ label, trigger, children }: ItemDrawerProps) {
  const [open, setOpen] = useState(false);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="flex cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring *:flex-1"
      >
        {trigger}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto data-[side=right]:sm:max-w-xl">{children}</SheetContent>
      </Sheet>
    </>
  );
}
