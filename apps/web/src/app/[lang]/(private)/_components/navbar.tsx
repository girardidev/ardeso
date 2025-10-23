"use client";

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
import { Input } from "@repo/next-ui/components/ui/input";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import type { getDictionary } from "@/i18n";

interface NavbarProps {
  lang: string;
  dict: Awaited<ReturnType<typeof getDictionary>>;
}

export function Navbar({ dict }: NavbarProps) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  async function handleSignOut() {
    await deleteAuthCookies("/auth/signin");
  }

  function handleLogoutClick() {
    setIsLogoutDialogOpen(true);
  }
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex flex-1 items-center gap-2 px-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={dict.navigation.search.placeholder}
            className="pl-8 bg-sidebar/50 border-sidebar-border"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">{dict.navigation.notifications}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
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
    </header>
  );
}
