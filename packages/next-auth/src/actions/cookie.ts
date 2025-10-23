"use server";

import { CookieManager } from "@repo/cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookie(name: string, value: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(name, value, CookieManager.defaultCookieOptions);
}

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(name);
}

export async function hasCookie(name: string): Promise<boolean> {
  const cookieStore = await cookies();

  return cookieStore.has(name);
}

/**
 * Session Token Cookie
 */
export async function getSessionTokenCookie(): Promise<string | undefined> {
  return getCookie(CookieManager.getSessionTokenCookieName());
}

export async function setSessionTokenCookie(token: string) {
  return await setCookie(CookieManager.getSessionTokenCookieName(), token);
}

/**
 * Refrash Token Cookie
 */
export async function getRefreshTokenCookie(): Promise<string | undefined> {
  return getCookie(CookieManager.getRefreshTokenCookieName());
}

export async function setRefreshTokenCookie(token: string) {
  return await setCookie(CookieManager.getRefreshTokenCookieName(), token);
}

/**
 * Utils
 */
export async function deleteAuthCookies(redirectTo: string) {
  console.log("deleteAuthCookies");
  await Promise.all([
    deleteCookie(CookieManager.getSessionTokenCookieName()),
    deleteCookie(CookieManager.getRefreshTokenCookieName()),
  ]);
  console.log("redirecting to", redirectTo);
  redirect(redirectTo);
}

export async function setAuthCookies(
  token: string,
  refreshToken: string,
  redirectTo?: string,
) {
  await Promise.all([
    setSessionTokenCookie(token),
    setRefreshTokenCookie(refreshToken),
  ]);

  if (redirectTo) {
    redirect(redirectTo);
  }
}
