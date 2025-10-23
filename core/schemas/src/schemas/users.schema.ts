import { index, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamp";

export const authRoles = ["ADMIN", "USER"] as const;
export const authRolesEnum = pgEnum("user_roles", authRoles);

export const authProviders = ["GOOGLE"] as const;
export const authProvidersEnum = pgEnum("user_providers", authProviders);

export const usersTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    email: text().notNull(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    fullName: text().notNull(),
    avatar: text(),
    // Auth
    role: authRolesEnum().notNull().default("USER"),
    provider: authProvidersEnum(),
    providerId: text(),
    password: text(),
    ...timestamps,
  },
  (t) => [index().on(t.fullName), index().on(t.email)],
);
