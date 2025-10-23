import { usersTable } from "@core/schemas";
import { eq, like, or, type SQL } from "drizzle-orm";
import type { NewUser, User, UserRepository } from "@/core";
import { db } from "@/shared";

export class DrizzleUserRepository implements UserRepository {
  async create(data: NewUser): Promise<User | null> {
    const result = await db.insert(usersTable).values(data).returning();
    return result[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return result[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return result[0] || null;
  }

  async findByProviderId(providerId: string): Promise<User | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.providerId, providerId))
      .limit(1);
    return result[0] || null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id));
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const result = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();
    return result[0] || null;
  }

  async list(options: {
    limit: number;
    offset: number;
    search?: string;
  }): Promise<{ users: User[]; total: number }> {
    const { limit, offset, search } = options;

    let whereClause: SQL<unknown> | undefined;
    if (search) {
      whereClause = or(
        like(usersTable.fullName, `%${search}%`),
        like(usersTable.email, `%${search}%`),
      );
    }

    const [users, total] = await Promise.all([
      db
        .select()
        .from(usersTable)
        .where(whereClause)
        .orderBy(usersTable.createdAt)
        .limit(limit)
        .offset(offset),
      db.$count(usersTable),
    ]);

    return {
      users,
      total,
    };
  }
}
