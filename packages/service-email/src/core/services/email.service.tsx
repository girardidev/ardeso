import { env } from "@/config";
import type { Email, EmailRepository } from "@/core";

export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendEmail<TProps>(
    email: Omit<Email, "body" | "from"> & {
      react: React.FC<TProps>;
      props: TProps;
    },
  ) {
    await this.emailRepository.sendReactEmail({
      from: env.EMAIL_FROM_ADDRESS,
      to: email.to,
      subject: email.subject,
      body: <>{email.react(email.props)}</>,
    });
  }
}
