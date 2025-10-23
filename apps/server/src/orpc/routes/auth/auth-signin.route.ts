import { ORPCError } from "@orpc/server";
import z from "zod";
import { tokensSchema } from "@/core/entities/tokens.entity";
import { base } from "@/orpc/context";

export default base
  .route({ method: "POST", path: "/signin" })
  .input(
    z.object({
      email: z.email(),
      password: z.string().min(5),
    }),
  )
  .output(tokensSchema)
  .handler(async ({ input: { email, password }, context: { di } }) => {
    const authService = di.getAuthService();

    try {
      return await authService.signIn(email, password);
    } catch (_) {
      throw new ORPCError("UNAUTHORIZED", { message: "Invalid credentials" });
    }
  });
