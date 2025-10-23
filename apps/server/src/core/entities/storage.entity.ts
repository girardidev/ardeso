import { storageTable } from "@core/schemas";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";

export const storageSelectSchema = createSelectSchema(storageTable);
export const storageInsertSchema = createInsertSchema(storageTable);
export const storageUpdateSchema = createUpdateSchema(storageTable);

export type StorageFile = z.infer<typeof storageSelectSchema>;
export type NewStorageFile = z.infer<typeof storageInsertSchema>;
export type UpdateStorageFile = z.infer<typeof storageUpdateSchema>;
