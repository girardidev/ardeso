import type { NewUserTeam, UserTeam } from "@/core";

export interface UserTeamRepository {
  create(data: NewUserTeam): Promise<UserTeam | null>;
  findById(id: string): Promise<UserTeam | null>;
  findByUserId(userId: string): Promise<UserTeam[]>;
  findByTeamId(teamId: string): Promise<UserTeam[]>;
  findByUserAndTeamId(userId: string, teamId: string): Promise<UserTeam | null>;
  update(id: string, data: Partial<UserTeam>): Promise<UserTeam | null>;
  delete(id: string): Promise<void>;
  deleteByUserAndTeamId(userId: string, teamId: string): Promise<void>;
  list(options: {
    limit: number;
    offset: number;
    userId?: string;
    teamId?: string;
  }): Promise<{ userTeams: UserTeam[]; total: number }>;
}
