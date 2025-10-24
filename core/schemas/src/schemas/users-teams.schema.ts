import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamp";
import { teamsTable } from "./teams.schema";
import { usersTable } from "./users.schema";

export const usersTeamsRoles = ["OWNER", "ADMIN", "MEMBER"] as const;
export const usersTeamsRolesEnum = pgEnum("users_teams_roles", usersTeamsRoles);

export const usersTeamsTable = pgTable("users_teams", {
  id: uuid().primaryKey().defaultRandom(),
  role: usersTeamsRolesEnum().notNull().default("MEMBER"),
  userId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  teamId: uuid()
    .references(() => teamsTable.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
});
