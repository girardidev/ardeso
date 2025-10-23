import { AuthService } from "@/core";
import { getAuthCodeService } from "./di-auth-code-service";
import { getGoogleAuthService } from "./di-google-auth-service";
import { getJWTService } from "./di-jwt-service";
import { getPasswordService } from "./di-password-service";
import { getUserRepository } from "./di-user-repository";

let authService: AuthService;

export function getAuthService(): AuthService {
  if (!authService) {
    authService = new AuthService(
      getUserRepository(),
      getPasswordService(),
      getJWTService(),
      getGoogleAuthService(),
      getAuthCodeService(),
    );
  }
  return authService;
}
