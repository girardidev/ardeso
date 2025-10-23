import { JsonWebTokenService, type JWTService } from "@/shared";

let jwtService: JWTService;

export function getJWTService(): JWTService {
  if (!jwtService) {
    jwtService = new JsonWebTokenService();
  }
  return jwtService;
}
