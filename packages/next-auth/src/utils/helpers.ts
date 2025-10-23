import { CookieManager } from "@repo/cookie";
import { decodeJwt } from "jose";
import { type NextRequest, NextResponse } from "next/server";

export function createRedirect(
  req: NextRequest,
  pathname: string,
  clearCookies = false,
) {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = pathname;
  const response = NextResponse.redirect(redirectUrl);
  if (clearCookies) {
    response.cookies.delete(CookieManager.getSessionTokenCookieName());
    response.cookies.delete(CookieManager.getRefreshTokenCookieName());
  }
  return response;
}

export function isTokenExpired(token: string) {
  const decoded = decodeJwt(token);

  return decoded.exp && decoded.exp < Math.floor(Date.now() / 1000) + 30;
}
