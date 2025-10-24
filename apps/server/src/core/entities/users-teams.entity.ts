import { type usersTeamsRoles, usersTeamsTable } from "@core/schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";

export const userTeamSelectSchema = createSelectSchema(usersTeamsTable);
export const userTeamInsertSchema = createInsertSchema(usersTeamsTable);
export const userTeamUpdateSchema = createUpdateSchema(usersTeamsTable);

export type UserTeam = z.infer<typeof userTeamSelectSchema>;
export type NewUserTeam = z.infer<typeof userTeamInsertSchema>;
export type UpdateUserTeam = z.infer<typeof userTeamUpdateSchema>;

export type UserTeamRoles = (typeof usersTeamsRoles)[number];
