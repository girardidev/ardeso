type ResponseCookie = {
  name: string;
  value: string;
  expires: Date;
  path: string;
  domain: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none";
};

// biome-ignore lint/complexity/noStaticOnlyClass: because yes
export class CookieManager {
  private static readonly AUTH_COOKIE_PREFIX = "blueprint";
  private static readonly IS_DEVELOPMENT =
    process.env.NODE_ENV === "development";

  static defaultCookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: !CookieManager.IS_DEVELOPMENT,
    sameSite: CookieManager.IS_DEVELOPMENT ? "lax" : "strict",
  };

  static getCookieName(name: string): string {
    return `${CookieManager.AUTH_COOKIE_PREFIX}-${name}`;
  }

  static getSessionTokenCookieName(): string {
    return CookieManager.getCookieName("session-token");
  }

  static getRefreshTokenCookieName(): string {
    return CookieManager.getCookieName("refresh-token");
  }
}
