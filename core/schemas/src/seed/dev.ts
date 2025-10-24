import { db } from "@repo/drizzle";
import bcrypt from "bcrypt";
import { reset, seed } from "drizzle-seed";
import {
  companiesTable,
  teamsTable,
  usersCompaniesTable,
  usersTable,
  usersTeamsTable,
} from "..";
import { genAvatars, genEmails, genUuids, seedRelations } from "./utils";

const schema = {
  usersTable,
  companiesTable,
  teamsTable,
};

export async function main() {
  console.log("🚀 Starting database seeding process...");

  console.log("🗑️  Resetting database...");
  await reset(db, { ...schema, usersCompaniesTable, usersTeamsTable });
  console.log("✅ Database reset completed");

  const usersPassword = await bcrypt.hash("admin", 10);
  const usersEmails = genEmails(100);
  const usersAvatars = genAvatars(100);
  const usersIds = genUuids(100);
  const companiesIds = genUuids(10);
  const teamsIds = genUuids(30);

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
      withRelations: {
        company: 3,
      },
    },
    companiesTable: {
      count: 10,
      columns: {
        id: f.valuesFromArray({ values: companiesIds, isUnique: true }),
        name: f.companyName(),
      },
      withRelations: {
        teamsTable: 3,
      },
    },
    teamsTable: {
      count: 30,
      columns: {
        id: f.valuesFromArray({ values: teamsIds, isUnique: true }),
      },
    },
  }));
  console.log("✅ Database seeding completed");

  await seedRelations();

  console.log("🎉 Database seeding process finished successfully!");
  process.exit(0);
}

main();
