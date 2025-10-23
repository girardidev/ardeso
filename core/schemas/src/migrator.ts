import { join } from "node:path";
import { db } from "@repo/drizzle";
import { migrate } from "drizzle-orm/node-postgres/migrator";

function migrateSchemas() {
  const migrationsFolder = join(__dirname, "../migrations");

  migrate(db, { migrationsFolder })
    .then(() => {
      console.log("Migration completed ✅");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed ❌", error);
      process.exit(1);
    });
}

migrateSchemas();
