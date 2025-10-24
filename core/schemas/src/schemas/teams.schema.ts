import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamp";
import { companiesTable } from "./companies.schema";

export const teamsTable = pgTable("teams", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  companyId: uuid()
    .references(() => companiesTable.id, { onDelete: "cascade" })
    .notNull(),
  ...timestamps,
});
