import { usersCompaniesTable } from "@core/schemas";
import { and, eq, type SQL } from "drizzle-orm";
import type {
  NewUserCompany,
  UserCompany,
  UserCompanyRepository,
} from "@/core";
import { db } from "@/shared";

export class DrizzleUserCompanyRepository implements UserCompanyRepository {
  async create(data: NewUserCompany): Promise<UserCompany | null> {
    const result = await db
      .insert(usersCompaniesTable)
      .values(data)
      .returning();
    return result[0] || null;
  }

  async findById(id: string): Promise<UserCompany | null> {
    const result = await db
      .select()
      .from(usersCompaniesTable)
      .where(eq(usersCompaniesTable.id, id))
      .limit(1);
    return result[0] || null;
  }

  async findByUserId(userId: string): Promise<UserCompany[]> {
    return await db
      .select()
      .from(usersCompaniesTable)
      .where(eq(usersCompaniesTable.userId, userId))
      .orderBy(usersCompaniesTable.createdAt);
  }

  async findByCompanyId(companyId: string): Promise<UserCompany[]> {
    return await db
      .select()
      .from(usersCompaniesTable)
      .where(eq(usersCompaniesTable.companyId, companyId))
      .orderBy(usersCompaniesTable.createdAt);
  }

  async findByUserAndCompanyId(
    userId: string,
    companyId: string,
  ): Promise<UserCompany | null> {
    const result = await db
      .select()
      .from(usersCompaniesTable)
      .where(
        and(
          eq(usersCompaniesTable.userId, userId),
          eq(usersCompaniesTable.companyId, companyId),
        ),
      )
      .limit(1);
    return result[0] || null;
  }

  async update(
    id: string,
    data: Partial<UserCompany>,
  ): Promise<UserCompany | null> {
    const result = await db
      .update(usersCompaniesTable)
      .set(data)
      .where(eq(usersCompaniesTable.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersCompaniesTable).where(eq(usersCompaniesTable.id, id));
  }

  async deleteByUserAndCompanyId(
    userId: string,
    companyId: string,
  ): Promise<void> {
    await db
      .delete(usersCompaniesTable)
      .where(
        and(
          eq(usersCompaniesTable.userId, userId),
          eq(usersCompaniesTable.companyId, companyId),
        ),
      );
  }

  async list(options: {
    limit: number;
    offset: number;
    userId?: string;
    companyId?: string;
  }): Promise<{ userCompanies: UserCompany[]; total: number }> {
    const { limit, offset, userId, companyId } = options;

    const conditions: SQL<unknown>[] = [];

    if (userId) {
      conditions.push(eq(usersCompaniesTable.userId, userId));
    }

    if (companyId) {
      conditions.push(eq(usersCompaniesTable.companyId, companyId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [userCompanies, total] = await Promise.all([
      db
        .select()
        .from(usersCompaniesTable)
        .where(whereClause)
        .orderBy(usersCompaniesTable.createdAt)
        .limit(limit)
        .offset(offset),
      db.$count(usersCompaniesTable),
    ]);

    return {
      userCompanies,
      total,
    };
  }
}
