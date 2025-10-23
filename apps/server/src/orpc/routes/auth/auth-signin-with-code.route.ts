import { ORPCError } from "@orpc/server";
import z from "zod";
import { tokensSchema } from "@/core/entities/tokens.entity";
import { base } from "@/orpc/context";

export default base
  .route({ method: "POST", path: "/code" })
  .input(z.object({ email: z.email(), code: z.string().length(6) }))
  .output(tokensSchema)
  .handler(async ({ input: { email, code }, context: { di } }) => {
    const authService = di.getAuthService();

    try {
      return await authService.signInWithCode(email, code);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid verification code";
      if (message.includes("not found")) {
        throw new ORPCError("NOT_FOUND", { message });
      }
      throw new ORPCError("UNAUTHORIZED", { message });
    }
  });
