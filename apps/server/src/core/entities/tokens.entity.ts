import z from "zod";

export const tokensSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});
