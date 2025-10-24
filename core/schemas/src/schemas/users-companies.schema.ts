import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamp";
import { companiesTable } from "./companies.schema";
import { usersTable } from "./users.schema";

export const usersCompaniesRoles = ["OWNER", "ADMIN", "MEMBER"] as const;
export const usersCompaniesRolesEnum = pgEnum(
  "users_companies_roles",
  usersCompaniesRoles,
);

export const usersCompaniesTable = pgTable("users_companies", {
  id: uuid().primaryKey().defaultRandom(),
  role: usersCompaniesRolesEnum().notNull().default("MEMBER"),
  userId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  companyId: uuid()
    .references(() => companiesTable.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
});
