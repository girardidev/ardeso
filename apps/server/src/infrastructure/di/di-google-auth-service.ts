import type { GoogleAuthService } from "@/core";
import { OAuth2GoogleAuthService } from "../external-apis/google-auth.service.impl";

let googleAuthService: GoogleAuthService;

export function getGoogleAuthService(): GoogleAuthService {
  if (!googleAuthService) {
    googleAuthService = new OAuth2GoogleAuthService();
  }
  return googleAuthService;
}
