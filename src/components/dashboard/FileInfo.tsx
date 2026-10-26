import { File } from "lucide-react";
import { formatFileSize } from "@/lib/format";
import { cn } from "@/lib/utils";

interface FileInfoProps {
  fileName: string;
  fileSize: number | null;
  compact?: boolean;
}

export function FileInfo({ fileName, fileSize, compact = false }: FileInfoProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
      <File className="size-5 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className={cn("font-medium", compact ? "truncate text-xs" : "text-sm break-all")}>{fileName}</p>
        {fileSize !== null && <p className="text-xs text-muted-foreground">{formatFileSize(fileSize)}</p>}
      </div>
    </div>
  );
}
