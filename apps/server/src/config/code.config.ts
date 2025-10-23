import { env } from "./env.config";

export const codeConfig = {
  emailVerificationExpiresIn: env.AUTH_CODE_EMAIL_VERIFICATION_EXPIRES_IN,
  forgotPasswordExpiresIn: env.AUTH_CODE_FORGOT_PASSWORD_EXPIRES_IN,
  codeLength: 6,
};
