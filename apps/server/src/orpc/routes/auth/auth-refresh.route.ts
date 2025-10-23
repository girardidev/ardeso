import { ORPCError } from "@orpc/server";
import { CookieManager } from "@repo/cookie";
import { tokensSchema } from "@/core/entities/tokens.entity";
import { base } from "@/orpc/context";

export default base
  .route({ method: "POST", path: "/refresh" })
  .output(tokensSchema)
  .handler(async ({ context: { headers, di } }) => {
    const authService = di.getAuthService();

    const cookies = headers.get("cookie");

    const refreshToken = cookies
      ?.split("; ")
      .find((cookie) =>
        cookie.startsWith(CookieManager.getRefreshTokenCookieName()),
      )
      ?.split("=")?.[1];

    if (!refreshToken) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "Invalid refresh token",
      });
    }

    try {
      return await authService.refresh(refreshToken);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid refresh token";
      throw new ORPCError("UNAUTHORIZED", { message });
    }
  });
