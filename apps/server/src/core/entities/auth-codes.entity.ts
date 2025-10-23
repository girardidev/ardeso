import { authCodesTable, type authCodesType } from "@core/schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";

export const authCodesSelectSchema = createSelectSchema(authCodesTable);
export const authCodesInsertSchema = createInsertSchema(authCodesTable);
export const authCodesUpdateSchema = createUpdateSchema(authCodesTable);

export type AuthCode = z.infer<typeof authCodesSelectSchema>;
export type NewAuthCode = z.infer<typeof authCodesInsertSchema>;
export type UpdateAuthCode = z.infer<typeof authCodesUpdateSchema>;

export type AuthCodesType = (typeof authCodesType)[number];
