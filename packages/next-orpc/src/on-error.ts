import { isDefinedError, ORPCError } from "@orpc/client";
import {
  deleteAuthCookies,
  setAuthCookies,
} from "@repo/next-auth/actions/cookie";
import { fetchRefreshToken } from "@repo/next-auth/refresh-token";

export const errorHandler = async (error: unknown) => {
  if (isDefinedError(error) || error instanceof ORPCError) {
    if (error.data?.shouldLogOut) {
      await deleteAuthCookies("/auth/signin");
    }

    if (error.data?.shouldRevalidate) {
      const res = await fetchRefreshToken();
      if (res) {
        await setAuthCookies(res.token, res.refreshToken);
      }
    }
    return;
  }

  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return;
    }
  }

  console.error(error);
};
