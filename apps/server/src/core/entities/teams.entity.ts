import { teamsTable } from "@core/schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";

export const teamSelectSchema = createSelectSchema(teamsTable);
export const teamInsertSchema = createInsertSchema(teamsTable);
export const teamUpdateSchema = createUpdateSchema(teamsTable);

export type Team = z.infer<typeof teamSelectSchema>;
export type NewTeam = z.infer<typeof teamInsertSchema>;
export type UpdateTeam = z.infer<typeof teamUpdateSchema>;
