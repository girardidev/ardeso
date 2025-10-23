import type { AuthCode, AuthCodeRepository, AuthCodesType } from "@/core";

export class AuthCodesService {
  constructor(private authCodeRepository: AuthCodeRepository) {}

  async createCode(
    email: string,
    type: AuthCodesType,
    expiresAt: Date,
  ): Promise<string> {
    const code = this.generateCode();

    await this.authCodeRepository.deleteByEmailAndType(email, type);

    await this.authCodeRepository.create({
      code,
      email,
      type,
      expiresAt,
    });

    return code;
  }

  async verifyCode(
    email: string,
    code: string,
    type: AuthCodesType = "email_verification",
  ): Promise<boolean> {
    return await this.authCodeRepository.existsValidCode(email, code, type);
  }

  async getCode(
    email: string,
    type: AuthCodesType = "email_verification",
  ): Promise<AuthCode | null> {
    return await this.authCodeRepository.findByEmailAndType(email, type);
  }

  async deleteCode(email: string, type?: AuthCodesType): Promise<void> {
    await this.authCodeRepository.deleteByEmailAndType(email, type);
  }

  async cleanupExpiredCodes(): Promise<void> {
    await this.authCodeRepository.deleteExpired();
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
