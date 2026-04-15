import { FolderOpen, FileText, BarChart2 } from "lucide-react";

interface SavedFile {
  name: string;
  size: number;
  uploadedAt: string;
}

interface SavedFilesViewProps {
  savedFiles: SavedFile[];
  onOpenDashboard: () => void;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

export const SavedFilesView = ({ savedFiles, onOpenDashboard }: SavedFilesViewProps) => {
  if (savedFiles.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
          <FolderOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">No saved files yet</h3>
          <p className="text-sm text-muted-foreground">Upload a dataset to create your first dashboard. It will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">Saved Files</h2>
        <p className="text-sm text-muted-foreground mt-1">{savedFiles.length} file{savedFiles.length !== 1 ? "s" : ""} uploaded</p>
      </div>
      <div className="space-y-3">
        {savedFiles.map((file, i) => (
          <div
            key={i}
            onClick={onOpenDashboard}
            className="flex items-center gap-4 p-4 bg-card border border-border/60 rounded-xl hover:border-foreground/30 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              {file.name.endsWith(".xlsx") || file.name.endsWith(".xls")
                ? <BarChart2 className="h-6 w-6 text-primary" />
                : <FileText className="h-6 w-6 text-primary" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{file.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{formatTime(file.uploadedAt)}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-medium text-muted-foreground">{formatSize(file.size)}</p>
              <p className="text-xs text-primary font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Open Dashboard →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
