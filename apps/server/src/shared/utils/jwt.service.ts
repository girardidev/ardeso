import type { AuthRoles } from "@/core";

export interface JWTPayload {
  userId: string;
  email: string;
  role: AuthRoles;
}

export interface JWTService {
  generateAccessToken(payload: JWTPayload): string;
  generateRefreshToken(payload: JWTPayload): string;
  verifyAccessToken(token: string): JWTPayload | null;
  verifyRefreshToken(token: string): JWTPayload | null;
}
