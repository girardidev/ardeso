import { Resend } from "resend";
import { env } from "@/config";
import type { Email, EmailRepository } from "@/core";

export class EmailRepositoryImpl implements EmailRepository {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(env.EMAIL_RESEND_API_KEY);
  }

  async sendReactEmail(email: Email): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: email.from,
      to: email.to,
      subject: email.subject,
      react: email.body,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}
