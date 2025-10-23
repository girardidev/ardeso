import { unlazyRouter } from "@orpc/server";
import { base } from "@/orpc/context";
import * as routes from "@/orpc/routes";

export const router = base.router(routes);

export const resolvedRouter = unlazyRouter(router);
export type Router = Awaited<typeof resolvedRouter>;
