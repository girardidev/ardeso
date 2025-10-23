import { AuthCodesService } from "@/core";
import { getAuthCodeRepository } from "./di-auth-code-repository";

let authCodeService: AuthCodesService;

export function getAuthCodeService(): AuthCodesService {
  if (!authCodeService) {
    authCodeService = new AuthCodesService(getAuthCodeRepository());
  }
  return authCodeService;
}
