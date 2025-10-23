import type { EmailRepository } from "@/core";
import { EmailRepositoryImpl } from "@/infrastructure";

let emailRepository: EmailRepository;

export function getEmailRepository(): EmailRepository {
  if (!emailRepository) {
    emailRepository = new EmailRepositoryImpl();
  }
  return emailRepository;
}
