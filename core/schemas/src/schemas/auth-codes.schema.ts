import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamp";
export const authCodesType = ["forgot_password", "email_verification"] as const;
export const authCodesTypeEnum = pgEnum("auth_code_type", authCodesType);

export const authCodesTable = pgTable("auth_codes", {
  id: uuid().primaryKey().defaultRandom(),
  code: text().notNull(),
  email: text().notNull(),
  type: authCodesTypeEnum().notNull(),
  expiresAt: timestamp().notNull(),
  ...timestamps,
});
