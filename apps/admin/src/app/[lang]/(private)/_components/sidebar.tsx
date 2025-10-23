"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/next-ui/components/ui/sidebar";
import { BarChart3, Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { getDictionary } from "@/i18n";

interface AppSidebarProps {
  lang: string;
  dict: Awaited<ReturnType<typeof getDictionary>>;
}

const navigationItems = (dict: Awaited<ReturnType<typeof getDictionary>>) => [
  {
    title: dict.navigation.dashboard,
    url: "/app",
    icon: Home,
  },
  {
    title: dict.navigation.users,
    url: "/app/users",
    icon: Users,
  },
  {
    title: dict.navigation.reports,
    url: "/app/reports",
    icon: BarChart3,
  },
  {
    title: dict.navigation.settings,
    url: "/app/settings",
    icon: Settings,
  },
];

export function AppSidebar({ lang, dict }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Home className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Blueprint Admin</span>
            <span className="truncate text-xs">Painel de Controle</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems(dict).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/${lang}${item.url}`}
                  >
                    <Link href={`/${lang}${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
