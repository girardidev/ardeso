"use client";

import { useIsAuthenticated, useOrpc } from "@repo/next-orpc/orpc-provider";
import type { ApiOutputs } from "@repo/next-orpc/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type User = ApiOutputs["users"]["me"];

const userContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  const orpc = useOrpc();

  const { data: user } = useQuery(
    orpc.users.me.queryOptions({
      enabled: isAuthenticated,
    }),
  );

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export function useUser() {
  return useContext(userContext);
}
