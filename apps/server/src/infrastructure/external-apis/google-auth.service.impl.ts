import { OAuth2Client } from "google-auth-library";
import { googleConfig } from "@/config";
import type { GoogleAuthService, GoogleUserInfo } from "@/core";

export class OAuth2GoogleAuthService implements GoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client({
      client_id: googleConfig.clientId,
      client_secret: googleConfig.clientSecret,
    });
  }

  getAuthUrl(redirectUri: string): string {
    return this.client.generateAuthUrl({
      access_type: googleConfig.accessType,
      scope: googleConfig.scopes,
      redirect_uri: redirectUri,
    });
  }

  async verifyToken(
    code: string,
    redirectUri: string,
  ): Promise<GoogleUserInfo> {
    try {
      const { tokens } = await this.client.getToken({
        code,
        client_id: googleConfig.clientId,
        redirect_uri: redirectUri,
      });

      if (!tokens.id_token) {
        throw new Error("Invalid Google token");
      }

      const ticket = await this.client.verifyIdToken({
        idToken: tokens.id_token,
        audience: googleConfig.clientId,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new Error("Invalid Google token");
      }

      return {
        id: payload.sub,
        email: payload.email,
        firstName: payload.given_name || "",
        lastName: payload.family_name || "",
        fullName: payload.name || "",
        avatar: payload.picture,
      };
    } catch (_) {
      throw new Error("Invalid Google token");
    }
  }
}
