import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

interface StatsCardsProps {
  stats: Stat[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="flex-row items-center gap-3 px-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon className="size-5 text-muted-foreground" />
          </span>
          <div className="min-w-0">
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
            <p className="truncate text-xs text-muted-foreground">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
