import { EmailService } from "@/core";
import { getEmailRepository } from "@/infrastructure";

let emailService: EmailService;

export function getEmailService(): EmailService {
  if (!emailService) {
    emailService = new EmailService(getEmailRepository());
  }
  return emailService;
}
