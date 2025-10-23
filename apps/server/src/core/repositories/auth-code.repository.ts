import type { AuthCode, AuthCodesType, NewAuthCode } from "@/core";

export interface AuthCodeRepository {
  create(code: NewAuthCode): Promise<AuthCode>;

  findByEmailAndType(
    email: string,
    type: AuthCodesType,
  ): Promise<AuthCode | null>;

  findByEmailCodeAndType(
    email: string,
    code: string,
    type: AuthCodesType,
  ): Promise<AuthCode | null>;

  deleteByEmailAndType(email: string, type?: AuthCodesType): Promise<void>;
  deleteExpired(): Promise<void>;

  existsValidCode(
    email: string,
    code: string,
    type: AuthCodesType,
  ): Promise<boolean>;
}
