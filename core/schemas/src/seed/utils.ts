import { faker } from "@faker-js/faker";
import { db } from "@repo/drizzle";
import {
  companiesTable,
  teamsTable,
  usersCompaniesTable,
  usersTable,
  usersTeamsTable,
} from "..";

const SEED = 123;

export function genEmails(length: number) {
  return Array.from({ length }, (_, i) => `user${i}@mail.com`);
}

export function genAvatars(length: number) {
  faker.seed(SEED);
  return Array.from({ length }, (_) => faker.image.avatarGitHub());
}

export function genUuids(length: number) {
  faker.seed(SEED);
  return Array.from({ length }, (_) => faker.string.uuid());
}

export async function seedRelations() {
  console.log("🔗 Creating user-company and user-team relationships...");

  const users = await db.select().from(usersTable);
  const companies = await db.select().from(companiesTable);
  const teams = await db.select().from(teamsTable);

  if (!users.length || !companies.length || !teams.length) {
    console.log("⚠️  No data found to create relationships");
    return;
  }

  console.log(
    `📊 Found ${users.length} users, ${companies.length} companies, ${teams.length} teams`,
  );

  const userCompaniesRelations: {
    userId: string;
    companyId: string;
    role: "OWNER" | "ADMIN" | "MEMBER";
  }[] = [];

  const userTeamsRelations: {
    userId: string;
    teamId: string;
    role: "OWNER" | "ADMIN" | "MEMBER";
  }[] = [];

  const companyRoles = ["OWNER", "ADMIN", "MEMBER"] as const;
  const teamRoles = ["OWNER", "ADMIN", "MEMBER"] as const;

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    faker.seed(SEED + i);

    const shuffledCompanies = faker.helpers.shuffle([...companies]);
    const userCompanies = shuffledCompanies.slice(0, 2);

    for (const company of userCompanies) {
      const companyRole = faker.helpers.arrayElement(companyRoles);

      userCompaniesRelations.push({
        userId: user.id,
        companyId: company.id,
        role: companyRole,
      });

      const companyTeams = teams.filter(
        (team) => team.companyId === company.id,
      );

      if (companyTeams.length > 0) {
        const shuffledTeams = faker.helpers.shuffle([...companyTeams]);
        const userTeams = shuffledTeams.slice(0, 2);

        for (const team of userTeams) {
          const teamRole = faker.helpers.arrayElement(teamRoles);

          userTeamsRelations.push({
            userId: user.id,
            teamId: team.id,
            role: teamRole,
          });
        }
      }
    }
  }

  if (userCompaniesRelations.length > 0) {
    await db.insert(usersCompaniesTable).values(userCompaniesRelations);
    console.log(
      `✅ Created ${userCompaniesRelations.length} user-company relationships`,
    );
  }

  if (userTeamsRelations.length > 0) {
    await db.insert(usersTeamsTable).values(userTeamsRelations);
    console.log(
      `✅ Created ${userTeamsRelations.length} user-team relationships`,
    );
  }

  console.log("🎉 User relationships creation completed!");
}
