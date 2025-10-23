import type { NewUser, User } from "@/core";

export interface UserRepository {
  create(data: NewUser): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByProviderId(provider: string, providerId: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<void>;
  list(options: {
    limit: number;
    offset: number;
    search?: string;
  }): Promise<{ users: User[]; total: number }>;
}
