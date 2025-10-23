import { os } from "@orpc/server";
import type * as di from "@/infrastructure/di";

type Context = {
  headers: Headers;
  di: typeof di;
};

export const base = os.$context<Context>();
