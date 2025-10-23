import { db } from "@repo/drizzle";
import bcrypt from "bcrypt";
import { reset, seed } from "drizzle-seed";
import { usersTable } from "../index";
import { genAvatars, genEmails, genUuids } from "./utils";

const schema = {
  usersTable,
};

export async function main() {
  console.log("🚀 Starting database seeding process...");

  console.log("🗑️  Resetting database...");
  await reset(db, schema);
  console.log("✅ Database reset completed");

  const usersPassword = await bcrypt.hash("admin", 10);
  const usersEmails = genEmails(100);
  const usersAvatars = genAvatars(100);
  const usersIds = genUuids(100);

  console.log("🌱 Seeding database with initial data...");
  await seed(db, schema).refine((f) => ({
    usersTable: {
      count: 100,
      columns: {
        id: f.valuesFromArray({ values: usersIds, isUnique: true }),
        email: f.valuesFromArray({ values: usersEmails, isUnique: true }),
        avatar: f.valuesFromArray({ values: usersAvatars }),
        password: f.default({ defaultValue: usersPassword }),
        firstName: f.firstName(),
        lastName: f.lastName(),
        fullName: f.fullName(),
      },
    },
  }));
  console.log("✅ Database seeding completed");

  console.log("🎉 Database seeding process finished successfully!");
  process.exit(0);
}

main();
