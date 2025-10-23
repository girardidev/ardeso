"use client";

import { Button } from "@repo/next-ui/components/ui/button";
import { FileUp, FolderPlus, Plus, RefreshCw } from "lucide-react";

interface DashboardActionsProps {
  dict: {
    newProject: string;
    newFolder: string;
    importProjectFile: string;
    syncProjects: string;
  };
}

export function DashboardActions({ dict }: DashboardActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 h-9 bg-muted/50 border-border/50 hover:bg-accent/50 text-muted-foreground"
      >
        <Plus className="w-3.5 h-3.5" />
        {dict.newProject}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 h-9 bg-muted/50 border-border/50 hover:bg-accent/50 text-muted-foreground"
      >
        <FolderPlus className="w-3.5 h-3.5" />
        {dict.newFolder}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 h-9 bg-muted/50 border-border/50 hover:bg-accent/50 text-muted-foreground"
      >
        <FileUp className="w-3.5 h-3.5" />
        {dict.importProjectFile}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 h-9 bg-muted/50 border-border/50 hover:bg-accent/50 text-muted-foreground"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        {dict.syncProjects}
      </Button>
    </div>
  );
}
