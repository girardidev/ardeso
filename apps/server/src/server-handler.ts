import fs from "node:fs";
import path from "node:path";
import { minifyContractRouter } from "@orpc/contract";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError, unlazyRouter } from "@orpc/server";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import { router } from "./server-router";
import { handleError } from "./shared/utils/on-error";

export const handler = new OpenAPIHandler(router, {
  plugins: [new ZodSmartCoercionPlugin()],
  interceptors: [onError(handleError)],
});

export const generateRouterJson = async () => {
  console.log("\n⏳Generating router JSON...");

  const resolvedRouter = await unlazyRouter(router);

  const minifiedRouter = minifyContractRouter(resolvedRouter);

  const location = path.join(process.cwd(), "dist", "contract.json");

  fs.mkdirSync(path.dirname(location), { recursive: true });

  fs.writeFileSync(location, JSON.stringify(minifiedRouter));

  console.log("✅ Router JSON generated successfully\n");

  return location;
};
