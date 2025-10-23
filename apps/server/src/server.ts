import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as di from "@/infrastructure/di";
import { serverConfig } from "./config/server.config";
import { generateRouterJson, handler } from "./server-handler";

const app = new Hono();

if (serverConfig.logger) {
  app.use(logger());
}

app.use(
  cors({
    origin: serverConfig.cors.origin,
    allowMethods: serverConfig.cors.allowMethods,
    credentials: serverConfig.cors.credentials,
  }),
);

app.use("/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/",
    context: {
      headers: c.req.raw.headers,
      di,
    },
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

serve({
  fetch: app.fetch,
  port: serverConfig.port,
}).addListener("listening", async () => {
  console.log(`🚀 Server running on port ${serverConfig.port}`);
});

generateRouterJson().catch((error) => {
  console.error("Error generating contract", error);
});
