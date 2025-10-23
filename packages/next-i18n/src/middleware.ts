import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";

function getLocale(
  request: NextRequest,
  locales: string[],
  defaultLocale: string,
) {
  const headers: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function i18nMiddleware<const T extends string[]>(
  request: NextRequest,
  locales: T,
  defaultLocale: T[number],
) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale)
    return {
      locale: pathname.split("/")[1],
    };

  const locale = getLocale(request, locales, defaultLocale);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return {
    locale,
    redirect: NextResponse.redirect(request.nextUrl),
  };
}
