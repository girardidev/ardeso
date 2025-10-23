import { env } from "./env.config";

export const googleConfig = {
  clientId: env.AUTH_GOOGLE_CLIENT_ID || "",
  clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET || "",
  accessType: "offline" as const,
  scopes: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
};
