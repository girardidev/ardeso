import { BcryptPasswordService, type PasswordService } from "@/shared";

let passwordService: PasswordService;

export function getPasswordService(): PasswordService {
  if (!passwordService) {
    passwordService = new BcryptPasswordService();
  }
  return passwordService;
}
