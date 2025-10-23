import PasswordResetEmail from "@core/emails/emails/auth/password-reset";
import { getEmailService } from "@repo/service-email";
import z from "zod";
import { base } from "@/orpc/context";

const emailService = getEmailService();

export default base
  .route({ method: "POST", path: "/forgot-password" })
  .input(z.object({ email: z.email(), redirectUri: z.url() }))
  .output(z.object({ success: z.boolean() }))
  .handler(async ({ input: { email, redirectUri }, context: { di } }) => {
    const authService = di.getAuthService();

    const code = await authService.forgotPassword(email, redirectUri);

    if (code) {
      await emailService.sendEmail({
        to: email,
        subject: "Reset your password",
        react: PasswordResetEmail,
        props: {
          resetUrl: `${redirectUri}?email=${encodeURIComponent(email)}&code=${code}`,
          userEmail: email,
          expiresAt: "24 hours",
        },
      });
    }

    return { success: true };
  });
