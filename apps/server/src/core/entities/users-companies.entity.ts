import { type usersCompaniesRoles, usersCompaniesTable } from "@core/schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";

export const userCompanySelectSchema = createSelectSchema(usersCompaniesTable);
export const userCompanyInsertSchema = createInsertSchema(usersCompaniesTable);
export const userCompanyUpdateSchema = createUpdateSchema(usersCompaniesTable);

export type UserCompany = z.infer<typeof userCompanySelectSchema>;
export type NewUserCompany = z.infer<typeof userCompanyInsertSchema>;
export type UpdateUserCompany = z.infer<typeof userCompanyUpdateSchema>;

export type UserCompanyRoles = (typeof usersCompaniesRoles)[number];
