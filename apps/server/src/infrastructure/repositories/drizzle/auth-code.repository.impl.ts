import { authCodesTable } from "@core/schemas";
import { and, eq, gte, lt } from "drizzle-orm";
import type {
  AuthCode,
  AuthCodeRepository,
  AuthCodesType,
  NewAuthCode,
} from "@/core";
import { db } from "@/shared";

export class DrizzleAuthCodeRepository implements AuthCodeRepository {
  async create(code: NewAuthCode): Promise<AuthCode> {
    const now = new Date();

    const [result] = await db
      .insert(authCodesTable)
      .values({
        ...code,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (!result) {
      throw new Error("Failed to create auth code");
    }

    return result;
  }

  async findByEmailAndType(
    email: string,
    type: AuthCodesType,
  ): Promise<AuthCode | null> {
    const result = await db
      .select()
      .from(authCodesTable)
      .where(
        and(eq(authCodesTable.email, email), eq(authCodesTable.type, type)),
      )
      .limit(1);

    return result[0] || null;
  }

  async findByEmailCodeAndType(
    email: string,
    code: string,
    type: AuthCodesType,
  ): Promise<AuthCode | null> {
    const result = await db
      .select()
      .from(authCodesTable)
      .where(
        and(
          eq(authCodesTable.email, email),
          eq(authCodesTable.code, code),
          eq(authCodesTable.type, type),
          gte(authCodesTable.expiresAt, new Date()),
        ),
      )
      .limit(1);

    return result[0] || null;
  }

  async deleteByEmailAndType(
    email: string,
    type?: AuthCodesType,
  ): Promise<void> {
    const emailCondition = eq(authCodesTable.email, email);

    const whereCondition = type
      ? and(emailCondition, eq(authCodesTable.type, type))
      : emailCondition;

    await db.delete(authCodesTable).where(whereCondition);
  }

  async deleteExpired(): Promise<void> {
    await db
      .delete(authCodesTable)
      .where(lt(authCodesTable.expiresAt, new Date()));
  }

  async existsValidCode(
    email: string,
    code: string,
    type: AuthCodesType,
  ): Promise<boolean> {
    const result = await this.findByEmailCodeAndType(email, code, type);
    return !!result;
  }
}
