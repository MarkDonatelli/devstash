"use client";

import { useState, type ReactNode } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface ItemDrawerProps {
  label: string;
  trigger: ReactNode;
  children: ReactNode;
}

// A native button laid over the card opens the drawer, so the card's content isn't read as a button label
export function ItemDrawer({ label, trigger, children }: ItemDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group/item relative flex *:flex-1">
        {trigger}
        <button
          type="button"
          aria-label={label}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="absolute inset-0 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto data-[side=right]:sm:max-w-xl">{children}</SheetContent>
      </Sheet>
    </>
  );
}
