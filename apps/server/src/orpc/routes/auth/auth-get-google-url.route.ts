import z from "zod";
import { base } from "@/orpc/context";

export default base
  .route({ method: "GET", path: "/google" })
  .input(z.object({ redirectUri: z.url() }))
  .output(z.object({ url: z.string() }))
  .handler(async ({ input: { redirectUri }, context: { di } }) => {
    const authService = di.getAuthService();

    const url = authService.getGoogleUrl(redirectUri);

    return { url };
  });
