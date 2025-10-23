import { z } from "zod";

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
  SERVER_CORS_ORIGIN: z.string().default("*"),

  // Email Configuration
  EMAIL_RESEND_API_KEY: z.string(),
  EMAIL_FROM_ADDRESS: z.string(),

  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_S3_BASE_FOLDER: z.string().optional().default(""),
  AWS_S3_UPLOAD_EXPIRES_IN: z.coerce.number(),
  AWS_S3_DOWNLOAD_EXPIRES_IN: z.coerce.number(),

  // JWT Configuration
  AUTH_JWT_SECRET: z.string(),
  AUTH_JWT_EXPIRES_IN: z.string().default("15m"),
  AUTH_JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  // Google OAuth Configuration
  AUTH_GOOGLE_CLIENT_ID: z.string().optional(),
  AUTH_GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Password Configuration
  AUTH_PASSWORD_ROUNDS: z.coerce.number().default(12),

  // Code Configuration
  AUTH_CODE_EMAIL_VERIFICATION_EXPIRES_IN: z.coerce
    .number()
    .default(10 * 60 * 1000), // 10 minutes
  AUTH_CODE_FORGOT_PASSWORD_EXPIRES_IN: z.coerce
    .number()
    .default(24 * 60 * 60 * 1000), // 24 hours
});

export const env = envSchema.parse(process.env);
