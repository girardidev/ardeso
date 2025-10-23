import { authMiddleware } from "@repo/next-auth/middleware";
import { i18nMiddleware } from "@repo/next-i18n/middleware";
import type { NextRequest } from "next/server";
import { locales } from "./i18n";

export default async function middleware(request: NextRequest) {
  const { redirect, locale } = i18nMiddleware(request, locales, "pt");

  if (redirect) return redirect;

  return await authMiddleware({
    request,
    authConfig: {
      redirectWhenNotAuthenticated: `/${locale}/auth/signin`,
      redirectWhenAuthenticated: `/${locale}/app`,
    },
    privateRoutes: [
      {
        path: `/${locale}/app/*`,
      },
    ],
    publicRoutes: [
      {
        path: `/${locale}/auth/*`,
        whenAuthenticated: "redirect",
      },
    ],
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icon-*|apple-touch-icon.png|icon-*.svg|og-image*.png).*)",
  ],
};
