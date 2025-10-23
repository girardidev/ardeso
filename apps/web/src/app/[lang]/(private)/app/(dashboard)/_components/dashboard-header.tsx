"use client";

import { Avatar, AvatarFallback } from "@repo/next-ui/components/ui/avatar";
import { Button } from "@repo/next-ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/next-ui/components/ui/dropdown-menu";
import { ChevronDown, Folder, Hammer, Home, Users } from "lucide-react";

interface DashboardHeaderProps {
  dict: {
    selectCompany: string;
    selectTeam: string;
    projects: string;
    builds: string;
  };
}

export function DashboardHeader({ dict }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card text-foreground">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
            <Home className="w-4 h-4 text-primary-foreground" />
          </div>

          <div className="h-5 w-px bg-border" />

          <div className="flex items-center gap-0.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent h-8 text-xs font-normal px-2.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  {dict.selectCompany}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-popover border-border"
              >
                <DropdownMenuItem className="text-muted-foreground">
                  Company 1
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                  Company 2
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                  Company 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-4 w-px bg-border mx-1" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent h-8 text-xs font-normal px-2.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  {dict.selectTeam}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-popover border-border"
              >
                <DropdownMenuItem className="text-muted-foreground">
                  Team 1
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                  Team 2
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                  Team 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent h-8 text-xs font-normal px-3"
          >
            <Folder className="w-3.5 h-3.5" />
            {dict.projects}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent h-8 text-xs font-normal px-3"
          >
            <Hammer className="w-3.5 h-3.5" />
            {dict.builds}
          </Button>

          <Avatar className="h-8 w-8 ml-2">
            <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-semibold">
              VG
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
