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
    <div className="grid grid-cols-4 gap-2">
      <DashboardActionButton
        icon={<Plus className="w-3.5 h-3.5" />}
        label={dict.newProject}
      />
      <DashboardActionButton
        icon={<FolderPlus className="w-3.5 h-3.5" />}
        label={dict.newFolder}
      />
      <DashboardActionButton
        icon={<FileUp className="w-3.5 h-3.5" />}
        label={dict.importProjectFile}
      />
      <DashboardActionButton
        icon={<RefreshCw className="w-3.5 h-3.5" />}
        label={dict.syncProjects}
      />
    </div>
  );
}

function DashboardActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-22 flex justify-start items-center gap-2"
    >
      <span className="w-2" />
      {icon}
      {label}
    </Button>
  );
}
