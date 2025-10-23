import contract from "@app/server/contract";
import type { Router } from "@app/server/router";
import { onError } from "@orpc/client";
import type { ClientRetryPluginContext } from "@orpc/client/plugins";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import {
  getSessionTokenCookie,
  setAuthCookies,
} from "@repo/next-auth/actions/cookie";
import { fetchRefreshToken } from "@repo/next-auth/refresh-token";
import { isTokenExpired } from "@repo/next-auth/utils/helpers";
import { isServer } from "@tanstack/react-query";
import { errorHandler } from "./on-error";

interface ORPCClientContext extends ClientRetryPluginContext {
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  token?: string;
}

export const link = new OpenAPILink<ORPCClientContext>(contract as Router, {
  url: process.env.NEXT_PUBLIC_API_URL as string,
  headers: async ({ context }) => {
    let token: string | undefined;
    let extraHeaders = {};
    let cookieHeader: string | undefined;

    if (context.token || !isServer) {
      token = context.token;
    } else {
      const { headers } = await import("next/headers");

      token = await getSessionTokenCookie();

      extraHeaders = {
        ...Object.fromEntries(await headers()),
      };

      cookieHeader = (await headers()).get("cookie") ?? undefined;
    }

    if (token && isTokenExpired(token)) {
      const res = await fetchRefreshToken(cookieHeader);

      if (res) {
        token = res.token;

        // TODO: Refresh token 2x
        if (!isServer) {
          await setAuthCookies(res.token, res.refreshToken);
        }
      }
    }

    return {
      ...extraHeaders,
      Authorization: token ? `Bearer ${token}` : undefined,
    };
  },
  fetch: (request, init, { context }) =>
    globalThis.fetch(request, {
      ...init,
      credentials: context.credentials,
      next: context.next,
      cache: context.cache,
    }),
  interceptors: [onError(errorHandler)],
});
