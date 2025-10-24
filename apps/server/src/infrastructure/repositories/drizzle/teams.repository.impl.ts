import { teamsTable } from "@core/schemas";
import { and, eq, like, type SQL } from "drizzle-orm";
import type { NewTeam, Team, TeamRepository } from "@/core";
import { db } from "@/shared";

export class DrizzleTeamRepository implements TeamRepository {
  async create(data: NewTeam): Promise<Team | null> {
    const result = await db.insert(teamsTable).values(data).returning();
    return result[0] || null;
  }

  async findById(id: string): Promise<Team | null> {
    const result = await db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.id, id))
      .limit(1);
    return result[0] || null;
  }

  async findByCompanyId(companyId: string): Promise<Team[]> {
    return await db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.companyId, companyId))
      .orderBy(teamsTable.createdAt);
  }

  async update(id: string, data: Partial<Team>): Promise<Team | null> {
    const result = await db
      .update(teamsTable)
      .set(data)
      .where(eq(teamsTable.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(teamsTable).where(eq(teamsTable.id, id));
  }

  async list(options: {
    limit: number;
    offset: number;
    search?: string;
    companyId?: string;
  }): Promise<{ teams: Team[]; total: number }> {
    const { limit, offset, search, companyId } = options;

    let whereClause: SQL<unknown> | undefined;
    const conditions: SQL<unknown>[] = [];

    if (search) {
      conditions.push(like(teamsTable.name, `%${search}%`));
    }

    if (companyId) {
      conditions.push(eq(teamsTable.companyId, companyId));
    }

    if (conditions.length > 0) {
      whereClause =
        conditions.length === 1 ? conditions[0] : and(...conditions);
    }

    const [teams, total] = await Promise.all([
      db
        .select()
        .from(teamsTable)
        .where(whereClause)
        .orderBy(teamsTable.createdAt)
        .limit(limit)
        .offset(offset),
      db.$count(teamsTable),
    ]);

    return {
      teams,
      total,
    };
  }
}
