import jwt from "jsonwebtoken";
import { jwtConfig } from "@/config";
import type { JWTPayload, JWTService } from "./jwt.service";

export class JsonWebTokenService implements JWTService {
  generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: "5m",
      algorithm: jwtConfig.algorithm,
    });
  }

  generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: "7d",
      algorithm: jwtConfig.algorithm,
    });
  }

  verifyAccessToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, jwtConfig.secret, {
        algorithms: [jwtConfig.algorithm],
      }) as JWTPayload;
    } catch (_) {
      return null;
    }
  }

  verifyRefreshToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, jwtConfig.secret, {
        algorithms: [jwtConfig.algorithm],
      }) as JWTPayload;
    } catch (_) {
      return null;
    }
  }
}
