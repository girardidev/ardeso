"use client";

import { OrpcProvider } from "@repo/next-orpc/orpc-provider";
import { ThemeProvider } from "@repo/next-ui/components/theme-provider";
import { Toaster } from "@repo/next-ui/components/ui/sonner";

export default function Providers({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <OrpcProvider token={token}>
        {children}

        <Toaster position="top-center" />
      </OrpcProvider>
    </ThemeProvider>
  );
}
