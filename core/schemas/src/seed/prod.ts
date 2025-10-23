import { db } from "@repo/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "../index";

export async function main() {
  console.log("🚀 Starting database seeding process...");

  const adminEmail = "admin@admin.com";

  // Check if admin user already exists
  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, adminEmail))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(usersTable).values({
      email: adminEmail,
      firstName: "Admin",
      lastName: "Admin",
      fullName: "Admin Admin",
      password: "admin",
    });
    console.log("✅ Admin user inserted");
  } else {
    console.log("ℹ️ Admin user already exists, skipping insert");
  }

  console.log("✅ Database seeding completed");

  console.log("🎉 Database seeding process finished successfully!");
  process.exit(0);
}

main();
