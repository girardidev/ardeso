"use client";
import { useOrpc } from "@repo/next-orpc/orpc-provider";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/next-ui/components/ui/avatar";
import { Badge } from "@repo/next-ui/components/ui/badge";
import { Button } from "@repo/next-ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/next-ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/next-ui/components/ui/dropdown-menu";
import { Input } from "@repo/next-ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/next-ui/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Filter, Mail, MoreHorizontal, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n";

interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string | null;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "inactive" | "pending";
  lastActive: string;
  joinDate: string;
  avatar?: string;
}

const statusColors = {
  active: "default",
  inactive: "secondary",
  pending: "outline",
} as const;

const roleColors = {
  admin: "destructive",
  moderator: "default",
  user: "secondary",
} as const;

function mapApiUserToUser(apiUser: ApiUser): User {
  // Map API role to component role
  const roleMap = {
    ADMIN: "admin" as const,
    USER: "user" as const,
  };

  // Calculate status based on updatedAt (simple logic: active if updated recently)
  const updatedAt = new Date(apiUser.updatedAt);
  const now = new Date();
  const daysSinceUpdate =
    (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);

  let status: "active" | "inactive" | "pending" = "active";
  if (daysSinceUpdate > 30) {
    status = "inactive";
  } else if (daysSinceUpdate > 7) {
    status = "pending";
  }

  // Format lastActive
  let lastActive = "Never";
  if (daysSinceUpdate < 1) {
    const hours = Math.floor(daysSinceUpdate * 24);
    lastActive =
      hours === 0 ? "Just now" : `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (daysSinceUpdate < 7) {
    const days = Math.floor(daysSinceUpdate);
    lastActive = `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (daysSinceUpdate < 30) {
    const weeks = Math.floor(daysSinceUpdate / 7);
    lastActive = `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    const months = Math.floor(daysSinceUpdate / 30);
    lastActive = `${months} month${months > 1 ? "s" : ""} ago`;
  }

  return {
    id: apiUser.id,
    name: apiUser.fullName,
    email: apiUser.email,
    role: roleMap[apiUser.role] || "user",
    status,
    lastActive,
    joinDate: new Date(apiUser.createdAt).toLocaleDateString(),
    avatar: apiUser.avatar || undefined,
  };
}

export function UsersTableWithStats({ dict }: { dict: Dictionary }) {
  const orpc = useOrpc();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: usersData, isLoading } = useQuery(
    orpc.users.list.queryOptions({
      input: {
        search: searchTerm,
        limit: 10,
        offset: 0,
      },
    }),
  );

  const users = useMemo(() => {
    return usersData?.users.map(mapApiUserToUser) || [];
  }, [usersData?.users]);

  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict.pages.users.stats.totalUsers.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {dict.pages.users.stats.totalUsers.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict.pages.users.stats.activeUsers.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (users.filter((u) => u.status === "active").length /
                  users.length) *
                100
              ).toFixed(1)}
              {dict.pages.users.stats.activeUsers.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict.pages.users.stats.pendingUsers.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {dict.pages.users.stats.pendingUsers.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict.pages.users.stats.newThisMonth.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              {dict.pages.users.stats.newThisMonth.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{dict.pages.users.table.allUsers}</CardTitle>
              <CardDescription>
                {dict.pages.users.table.allUsersDescription}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={dict.pages.users.table.search.placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {dict.pages.users.table.buttons.filter}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{dict.pages.users.table.headers.user}</TableHead>
                <TableHead>{dict.pages.users.table.headers.role}</TableHead>
                <TableHead>{dict.pages.users.table.headers.status}</TableHead>
                <TableHead>
                  {dict.pages.users.table.headers.lastActive}
                </TableHead>
                <TableHead>{dict.pages.users.table.headers.joinDate}</TableHead>
                <TableHead className="text-right">
                  {dict.pages.users.table.headers.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={roleColors[user.role]}>
                        {dict.common.roles[user.role]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[user.status]}>
                        {dict.common.status[user.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            {dict.pages.users.table.headers.actions}
                          </DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            {dict.pages.users.table.actions.sendEmail}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            {dict.pages.users.table.actions.callUser}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {dict.pages.users.table.actions.editUser}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {dict.pages.users.table.actions.viewProfile}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {dict.pages.users.table.actions.deleteUser}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
