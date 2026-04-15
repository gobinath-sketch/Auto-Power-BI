import { Download, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DownloadRecord {
  name: string;
  size: number;
  exportedAt: string;
  csvContent: string;
}

interface DownloadsViewProps {
  downloads: DownloadRecord[];
}

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const reDownload = (record: DownloadRecord) => {
  const blob = new Blob([record.csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = record.name;
  a.click();
  URL.revokeObjectURL(url);
};

export const DownloadsView = ({ downloads }: DownloadsViewProps) => {
  if (downloads.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
          <Download className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">No downloads yet</h3>
          <p className="text-sm text-muted-foreground">
            When you export data from a dashboard, your files will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">Downloads</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {downloads.length} file{downloads.length !== 1 ? "s" : ""} exported
        </p>
      </div>
      <div className="space-y-3">
        {downloads.map((record, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-card border border-border/60 rounded-xl hover:border-foreground/30 hover:shadow-sm transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <FileDown className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{record.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Exported on {formatTime(record.exportedAt)}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <p className="text-xs font-medium text-muted-foreground">{formatSize(record.size)}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => reDownload(record)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 gap-1.5 text-xs font-bold"
              >
                <Download className="h-3.5 w-3.5" />
                Re-download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
