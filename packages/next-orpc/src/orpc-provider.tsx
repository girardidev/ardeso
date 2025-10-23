"use client";

import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { createClient } from "./orpc-client";
import { createQueryClient } from "./query/client";
import type { ApiType } from "./types";

type OrpcContextType = {
  orpc: ReturnType<typeof createTanstackQueryUtils<ApiType>>;
  token?: string;
};

export const orpcContext = createContext<OrpcContextType | null>(null);

export const OrpcProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) => {
  const [queryClient] = useState(() => createQueryClient());

  const orpc = useMemo(
    () => createTanstackQueryUtils(createClient(token)),
    [token],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <orpcContext.Provider value={{ orpc, token }}>
        {children}
      </orpcContext.Provider>
    </QueryClientProvider>
  );
};

export const useOrpc = () => {
  const context = useContext(orpcContext);

  if (!context) {
    throw new Error("useOrpc must be used within a OrpcProvider");
  }

  return context.orpc;
};
