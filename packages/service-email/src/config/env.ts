import { z } from "zod";

const envSchema = z.object({
  EMAIL_RESEND_API_KEY: z.string(),
  EMAIL_FROM_ADDRESS: z.string(),
});

export const env = envSchema.parse(process.env);
