import { compare, hash } from "bcrypt";
import { env } from "@/config";
import type { PasswordService } from "./password.service";

export class BcryptPasswordService implements PasswordService {
  private rounds = env.AUTH_PASSWORD_ROUNDS;

  async hash(password: string): Promise<string> {
    return await hash(password, this.rounds);
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await compare(password, hashedPassword);
    } catch {
      return false;
    }
  }
}
