"use client";

import Logo from "@/assets/logo.png";
import type { Dictionary } from "@/i18n";
import { deleteAuthCookies } from "@repo/next-auth/actions/cookie";
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/next-ui/components/ui/avatar";
import { Button } from "@repo/next-ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/next-ui/components/ui/dropdown-menu";
import { ChevronDown, Folder, Hammer, Home, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DashboardHeaderProps {
  dict: Dictionary;
}

export function Navbar({ dict }: DashboardHeaderProps) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  async function handleSignOut() {
    await deleteAuthCookies("/auth/signin");
  }

  function handleLogoutClick() {
    setIsLogoutDialogOpen(true);
  }
  return (
    <>
      <header className="border-b border-border text-foreground bg-sidebar">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/app" className="flex items-center gap-2 font-semibold">
              <Image src={Logo} alt="Logo" width={30} height={30} />
            </Link>

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
                    {dict.pages.dashboard.header.selectCompany}
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
                    {dict.pages.dashboard.header.selectTeam}
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
              {dict.pages.dashboard.header.projects}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent h-8 text-xs font-normal px-3"
            >
              <Hammer className="w-3.5 h-3.5" />
              {dict.pages.dashboard.header.builds}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Admin"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{dict.navigation.profile}</DropdownMenuItem>
                <DropdownMenuItem>{dict.navigation.settings}</DropdownMenuItem>
                <DropdownMenuItem>{dict.navigation.support}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick}>
                  {dict.navigation.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dict.navigation.logoutDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dict.navigation.logoutDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {dict.navigation.logoutDialog.cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>
              {dict.navigation.logoutDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
