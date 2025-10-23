import z from "zod";
import { tokensSchema } from "@/core/entities/tokens.entity";
import { base } from "@/orpc/context";

export default base
  .route({ method: "POST", path: "/google" })
  .input(z.object({ code: z.string(), redirectUri: z.url() }))
  .output(tokensSchema)
  .handler(async ({ input: { code, redirectUri }, context: { di } }) => {
    const authService = di.getAuthService();

    return await authService.signInWithGoogle(code, redirectUri);
  });
