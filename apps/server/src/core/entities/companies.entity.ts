import { companiesTable } from "@core/schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";

export const companySelectSchema = createSelectSchema(companiesTable);
export const companyInsertSchema = createInsertSchema(companiesTable);
export const companyUpdateSchema = createUpdateSchema(companiesTable);

export type Company = z.infer<typeof companySelectSchema>;
export type NewCompany = z.infer<typeof companyInsertSchema>;
export type UpdateCompany = z.infer<typeof companyUpdateSchema>;
