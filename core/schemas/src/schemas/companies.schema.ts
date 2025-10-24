import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamp";
import { usersTable } from "./users.schema";

export const companiesTable = pgTable("companies", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  logo: text(),
  ownerId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
});
