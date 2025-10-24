import type { NewUserCompany, UserCompany } from "@/core";

export interface UserCompanyRepository {
  create(data: NewUserCompany): Promise<UserCompany | null>;
  findById(id: string): Promise<UserCompany | null>;
  findByUserId(userId: string): Promise<UserCompany[]>;
  findByCompanyId(companyId: string): Promise<UserCompany[]>;
  findByUserAndCompanyId(
    userId: string,
    companyId: string,
  ): Promise<UserCompany | null>;
  update(id: string, data: Partial<UserCompany>): Promise<UserCompany | null>;
  delete(id: string): Promise<void>;
  deleteByUserAndCompanyId(userId: string, companyId: string): Promise<void>;
  list(options: {
    limit: number;
    offset: number;
    userId?: string;
    companyId?: string;
  }): Promise<{ userCompanies: UserCompany[]; total: number }>;
}
