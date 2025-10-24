import type { NewTeam, Team } from "@/core";

export interface TeamRepository {
  create(data: NewTeam): Promise<Team | null>;
  findById(id: string): Promise<Team | null>;
  findByCompanyId(companyId: string): Promise<Team[]>;
  update(id: string, data: Partial<Team>): Promise<Team | null>;
  delete(id: string): Promise<void>;
  list(options: {
    limit: number;
    offset: number;
    search?: string;
    companyId?: string;
  }): Promise<{ teams: Team[]; total: number }>;
}
