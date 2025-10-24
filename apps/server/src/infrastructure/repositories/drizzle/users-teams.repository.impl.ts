import { usersTeamsTable } from "@core/schemas";
import { and, eq, type SQL } from "drizzle-orm";
import type { NewUserTeam, UserTeam, UserTeamRepository } from "@/core";
import { db } from "@/shared";

export class DrizzleUserTeamRepository implements UserTeamRepository {
  async create(data: NewUserTeam): Promise<UserTeam | null> {
    const result = await db.insert(usersTeamsTable).values(data).returning();
    return result[0] || null;
  }

  async findById(id: string): Promise<UserTeam | null> {
    const result = await db
      .select()
      .from(usersTeamsTable)
      .where(eq(usersTeamsTable.id, id))
      .limit(1);
    return result[0] || null;
  }

  async findByUserId(userId: string): Promise<UserTeam[]> {
    return await db
      .select()
      .from(usersTeamsTable)
      .where(eq(usersTeamsTable.userId, userId))
      .orderBy(usersTeamsTable.createdAt);
  }

  async findByTeamId(teamId: string): Promise<UserTeam[]> {
    return await db
      .select()
      .from(usersTeamsTable)
      .where(eq(usersTeamsTable.teamId, teamId))
      .orderBy(usersTeamsTable.createdAt);
  }

  async findByUserAndTeamId(
    userId: string,
    teamId: string,
  ): Promise<UserTeam | null> {
    const result = await db
      .select()
      .from(usersTeamsTable)
      .where(
        and(
          eq(usersTeamsTable.userId, userId),
          eq(usersTeamsTable.teamId, teamId),
        ),
      )
      .limit(1);
    return result[0] || null;
  }

  async update(id: string, data: Partial<UserTeam>): Promise<UserTeam | null> {
    const result = await db
      .update(usersTeamsTable)
      .set(data)
      .where(eq(usersTeamsTable.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersTeamsTable).where(eq(usersTeamsTable.id, id));
  }

  async deleteByUserAndTeamId(userId: string, teamId: string): Promise<void> {
    await db
      .delete(usersTeamsTable)
      .where(
        and(
          eq(usersTeamsTable.userId, userId),
          eq(usersTeamsTable.teamId, teamId),
        ),
      );
  }

  async list(options: {
    limit: number;
    offset: number;
    userId?: string;
    teamId?: string;
  }): Promise<{ userTeams: UserTeam[]; total: number }> {
    const { limit, offset, userId, teamId } = options;

    const conditions: SQL<unknown>[] = [];

    if (userId) {
      conditions.push(eq(usersTeamsTable.userId, userId));
    }

    if (teamId) {
      conditions.push(eq(usersTeamsTable.teamId, teamId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [userTeams, total] = await Promise.all([
      db
        .select()
        .from(usersTeamsTable)
        .where(whereClause)
        .orderBy(usersTeamsTable.createdAt)
        .limit(limit)
        .offset(offset),
      db.$count(usersTeamsTable),
    ]);

    return {
      userTeams,
      total,
    };
  }
}
