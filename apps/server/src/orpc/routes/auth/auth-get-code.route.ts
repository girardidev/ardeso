import LoginCodeEmail from "@core/emails/emails/auth/login-code";
import { getEmailService } from "@repo/service-email";
import z from "zod";
import { base } from "@/orpc/context";

const emailService = getEmailService();

export default base
  .route({ method: "GET", path: "/code" })
  .input(z.object({ email: z.email() }))
  .output(z.object({ success: z.boolean() }))
  .handler(async ({ input: { email }, context: { di } }) => {
    const authService = di.getAuthService();

    const code = await authService.getCode(email);

    await emailService.sendEmail({
      to: email,
      subject: "Your login code",
      react: LoginCodeEmail,
      props: {
        validationCode: code,
      },
    });

    return { success: true };
  });
