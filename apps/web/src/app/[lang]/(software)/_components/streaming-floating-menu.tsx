"use client";

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
import { useState } from "react";
import { FaLinux } from "react-icons/fa6";

const mockProjects = [
  { id: "1", name: "Casa Moderna", description: "Projeto residencial 3D" },
  { id: "2", name: "Edifício Comercial", description: "Complexo empresarial" },
  { id: "3", name: "Shopping Center", description: "Centro comercial premium" },
  {
    id: "4",
    name: "Condomínio Fechado",
    description: "Área residencial completa",
  },
];

const mockImages = [
  { id: "1", name: "Fachada Principal.jpg", size: "2.4 MB" },
  { id: "2", name: "Interior Living.jpg", size: "1.8 MB" },
  { id: "3", name: "Vista Aérea.jpg", size: "3.2 MB" },
  { id: "4", name: "Plantas Baixas.jpg", size: "1.5 MB" },
  { id: "5", name: "Render Noturno.jpg", size: "2.9 MB" },
];

export function StreamingFloatingMenu() {
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
            <DropdownMenuLabel>Informações do Sistema</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Sistema Operacional
                </span>
                <span className="font-medium">Ubuntu 22.04 LTS</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Versão</span>
                <span className="font-medium">v0.2.12</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Qualidade de Streaming
                </span>
                <span className="font-medium">Alta (1080p @ 60fps)</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Latência</span>
                <span className="font-medium">23ms</span>
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
            <DialogTitle>Projetos Disponíveis</DialogTitle>
            <DialogDescription>
              Selecione um projeto para carregar no streaming
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {mockProjects.map((project) => (
              <button
                type="button"
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="w-full p-4 text-left border rounded-lg hover:bg-accent hover:border-accent-foreground transition-colors"
              >
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={imagesModalOpen} onOpenChange={setImagesModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Imagens do Projeto</DialogTitle>
            <DialogDescription>
              Visualize as imagens disponíveis
            </DialogDescription>
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
                  Visualizar
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Carregar Projeto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja carregar o projeto "{selectedProject?.name}
              " no streaming? Esta ação pode levar alguns minutos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedProject(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLoadProject}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
