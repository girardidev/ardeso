import { env } from "./env.config";

export const serverConfig = {
  port: env.SERVER_PORT,
  cors: {
    origin: env.SERVER_CORS_ORIGIN.split(" "),
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  },
  logger: process.env.NODE_ENV !== "production",
};
