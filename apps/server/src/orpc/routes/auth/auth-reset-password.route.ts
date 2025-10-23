import { ORPCError } from "@orpc/server";
import z from "zod";
import { base } from "@/orpc/context";

export default base
  .route({ method: "POST", path: "/reset-password" })
  .input(
    z.object({
      email: z.email(),
      code: z.string().length(6),
      password: z.string().min(8),
    }),
  )
  .output(z.object({ success: z.boolean() }))
  .handler(async ({ input: { email, code, password }, context: { di } }) => {
    const authService = di.getAuthService();

    try {
      await authService.resetPassword(email, code, password);
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to reset password";
      throw new ORPCError("BAD_REQUEST", { message });
    }
  });
