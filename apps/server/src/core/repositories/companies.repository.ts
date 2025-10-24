import type { Company, NewCompany } from "@/core";

export interface CompanyRepository {
  create(data: NewCompany): Promise<Company | null>;
  findById(id: string): Promise<Company | null>;
  findByOwnerId(ownerId: string): Promise<Company[]>;
  update(id: string, data: Partial<Company>): Promise<Company | null>;
  delete(id: string): Promise<void>;
  list(options: {
    limit: number;
    offset: number;
    search?: string;
  }): Promise<{ companies: Company[]; total: number }>;
}
