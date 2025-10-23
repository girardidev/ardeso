import { bigint, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamp";
import { usersTable } from "./users.schema";

export const storageTable = pgTable("storage", {
  id: uuid().primaryKey().defaultRandom(),
  key: text().notNull().unique(),
  filename: text().notNull(),
  mimetype: text().notNull(),
  size: bigint({ mode: "number" }).notNull(),
  bucket: text().notNull(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  ...timestamps,
});
