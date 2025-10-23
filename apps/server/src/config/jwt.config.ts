import { env } from "./env.config";

export const jwtConfig = {
  secret: env.AUTH_JWT_SECRET,
  accessTokenExpiresIn: env.AUTH_JWT_EXPIRES_IN,
  refreshTokenExpiresIn: env.AUTH_JWT_REFRESH_EXPIRES_IN,
  algorithm: "HS256" as const,
};
