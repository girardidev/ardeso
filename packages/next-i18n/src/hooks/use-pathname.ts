"use client";

import { usePathname as useNextPathname } from "next/navigation";

export function usePathname() {
  const pathname = useNextPathname();

  const path = pathname.split("/").slice(2).join("/");

  return `/${path}`;
}
