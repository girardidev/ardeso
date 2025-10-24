import { companiesTable } from "@core/schemas";
import { eq, like, type SQL } from "drizzle-orm";
import type { Company, CompanyRepository, NewCompany } from "@/core";
import { db } from "@/shared";

export class DrizzleCompanyRepository implements CompanyRepository {
  async create(data: NewCompany): Promise<Company | null> {
    const result = await db.insert(companiesTable).values(data).returning();
    return result[0] || null;
  }

  async findById(id: string): Promise<Company | null> {
    const result = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.id, id))
      .limit(1);
    return result[0] || null;
  }

  async findByOwnerId(ownerId: string): Promise<Company[]> {
    return await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.ownerId, ownerId))
      .orderBy(companiesTable.createdAt);
  }

  async update(id: string, data: Partial<Company>): Promise<Company | null> {
    const result = await db
      .update(companiesTable)
      .set(data)
      .where(eq(companiesTable.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(companiesTable).where(eq(companiesTable.id, id));
  }

  async list(options: {
    limit: number;
    offset: number;
    search?: string;
  }): Promise<{ companies: Company[]; total: number }> {
    const { limit, offset, search } = options;

    let whereClause: SQL<unknown> | undefined;
    if (search) {
      whereClause = like(companiesTable.name, `%${search}%`);
    }

    const [companies, total] = await Promise.all([
      db
        .select()
        .from(companiesTable)
        .where(whereClause)
        .orderBy(companiesTable.createdAt)
        .limit(limit)
        .offset(offset),
      db.$count(companiesTable),
    ]);

    return {
      companies,
      total,
    };
  }
}
