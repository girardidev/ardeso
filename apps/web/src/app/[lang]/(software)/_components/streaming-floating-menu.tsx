"use client";

import MockImage from "@/assets/background.png";
import type { Dictionary } from "@/i18n";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/next-ui/components/ui/alert-dialog";
import { Button } from "@repo/next-ui/components/ui/button";
import { Card, CardHeader, CardTitle } from "@repo/next-ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/next-ui/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/next-ui/components/ui/dropdown-menu";
import { FolderSearch2Icon, ImagesIcon, SignalHighIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaLinux } from "react-icons/fa6";

interface StreamingFloatingMenuProps {
  dict: Dictionary["software"]["streaming"]["floatingMenu"];
}

const mockProjects = [
  { id: "1", name: "Modern House", description: "3D residential project" },
  { id: "2", name: "Commercial Building", description: "Business complex" },
  { id: "3", name: "Shopping Center", description: "Premium shopping mall" },
  {
    id: "4",
    name: "Gated Community",
    description: "Complete residential area",
  },
];

const mockImages = [
  { id: "1", name: "Main Facade.jpg", size: "2.4 MB" },
  { id: "2", name: "Living Interior.jpg", size: "1.8 MB" },
  { id: "3", name: "Aerial View.jpg", size: "3.2 MB" },
  { id: "4", name: "Floor Plans.jpg", size: "1.5 MB" },
  { id: "5", name: "Night Render.jpg", size: "2.9 MB" },
];

export function StreamingFloatingMenu({ dict }: StreamingFloatingMenuProps) {
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [imagesModalOpen, setImagesModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof mockProjects)[0] | null
  >(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleProjectSelect = (project: (typeof mockProjects)[0]) => {
    setSelectedProject(project);
    setProjectsModalOpen(false);
    setConfirmDialogOpen(true);
  };

  const handleConfirmLoadProject = () => {
    console.log("Carregando projeto:", selectedProject?.name);
    setConfirmDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <SignalHighIcon />
              <FaLinux />
              v0.2.12
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>{dict.systemInfo}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  {dict.operatingSystem}
                </span>
                <span className="font-medium">Linux (Amazon Linux 2023)</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  {dict.version}
                </span>
                <span className="font-medium">v0.2.12</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  {dict.streamingQuality}
                </span>
                <span className="font-medium">High (1080p @ 60fps)</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  {dict.latency}
                </span>
                <span className="font-medium">--ms</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setProjectsModalOpen(true)}
        >
          <FolderSearch2Icon />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setImagesModalOpen(true)}
        >
          <ImagesIcon />
        </Button>
      </div>

      <Dialog open={projectsModalOpen} onOpenChange={setProjectsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dict.availableProjects}</DialogTitle>
            <DialogDescription>{dict.selectProject}</DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockProjects.map((project) => (
              <Card
                key={project.id}
                className="pt-0 overflow-hidden gap-0 cursor-pointer"
                onClick={() => handleProjectSelect(project)}
              >
                <Image
                  src={MockImage}
                  alt={project.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <CardHeader className="px-1 mt-3">
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={imagesModalOpen} onOpenChange={setImagesModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dict.projectImages}</DialogTitle>
            <DialogDescription>{dict.viewAvailableImages}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {mockImages.map((image) => (
              <div
                key={image.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                    <ImagesIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{image.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {image.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {dict.view}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dict.loadProject}</AlertDialogTitle>
            <AlertDialogDescription>
              {dict.confirmLoadProject.replace(
                "{projectName}",
                selectedProject?.name || "",
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedProject(null)}>
              {dict.cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLoadProject}>
              {dict.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
