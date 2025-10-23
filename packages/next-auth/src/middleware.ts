import { CookieManager } from "@repo/cookie";
import { type NextRequest, NextResponse } from "next/server";
import { createRedirect, isTokenExpired } from "./utils/helpers";

export type AuthConfig = {
  redirectWhenNotAuthenticated: string;
  redirectWhenAuthenticated: string;
};

export type PrivateRoute = {
  path: string;
};

export type PublicRoute = {
  path: string;
  whenAuthenticated: "redirect" | "next";
};

export type AuthMiddlewareOptions = {
  request: NextRequest;
  authConfig: AuthConfig;
  privateRoutes?: PrivateRoute[];
  publicRoutes?: PublicRoute[];
};

function matchesRoute(pattern: string, path: string): boolean {
  if (pattern.endsWith("/*")) {
    const basePattern = pattern.slice(0, -2);
    return path.startsWith(basePattern);
  }

  return pattern === path;
}

export async function authMiddleware({
  request,
  privateRoutes,
  publicRoutes = [],
  authConfig,
}: AuthMiddlewareOptions) {
  const path = request.nextUrl.pathname;

  const isPrivate = privateRoutes?.find((route) =>
    matchesRoute(route.path, path),
  );

  const authToken = request.cookies.get(
    CookieManager.getSessionTokenCookieName(),
  );

  if (!authToken) {
    if (isPrivate) {
      return createRedirect(request, authConfig.redirectWhenNotAuthenticated);
    }

    return NextResponse.next();
  }

  const isPublic = publicRoutes.find((route) => matchesRoute(route.path, path));

  if (isPublic && isPublic.whenAuthenticated === "redirect") {
    return createRedirect(request, authConfig.redirectWhenAuthenticated);
  }

  if (isTokenExpired(authToken.value)) {
    const refreshToken = request.cookies.get(
      CookieManager.getRefreshTokenCookieName(),
    );

    if (!refreshToken || isTokenExpired(refreshToken.value)) {
      if (isPrivate) {
        return createRedirect(
          request,
          authConfig.redirectWhenNotAuthenticated,
          true,
        );
      }
      const response = NextResponse.next();
      response.cookies.delete(CookieManager.getSessionTokenCookieName());
      response.cookies.delete(CookieManager.getRefreshTokenCookieName());
      return response;
    }
  }

  return NextResponse.next();
}
