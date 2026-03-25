import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const db = new Database("./dev.db");
const adapter = new PrismaBetterSqlite3({ url: "./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.vote.deleteMany();
  await prisma.feature.deleteMany();

  // Seed features
  const features = await Promise.all([
    prisma.feature.create({
      data: {
        title: "Dark mode support",
        description: "Add a dark theme option so users can switch based on their preference or system settings.",
      },
    }),
    prisma.feature.create({
      data: {
        title: "Export data to CSV",
        description: "Allow users to export their feature list and vote counts to a CSV file for reporting.",
      },
    }),
    prisma.feature.create({
      data: {
        title: "Email notifications",
        description: "Send email updates when a feature request gets a certain number of votes or a status change.",
      },
    }),
    prisma.feature.create({
      data: {
        title: "Comment on features",
        description: "Let users leave comments on feature requests to discuss implementation details or use cases.",
      },
    }),
    prisma.feature.create({
      data: {
        title: "Feature status labels",
        description: "Add labels like 'Under review', 'In progress', and 'Shipped' so users know where things stand.",
      },
    }),
  ]);

  // Seed votes with fake user IDs
  const users = [
    "user-aaa-111",
    "user-bbb-222",
    "user-ccc-333",
    "user-ddd-444",
    "user-eee-555",
  ];

  // dark mode: 5 votes (most popular)
  for (const userId of users) {
    await prisma.vote.create({ data: { featureId: features[0].id, userId } });
  }

  // export CSV: 3 votes
  for (const userId of users.slice(0, 3)) {
    await prisma.vote.create({ data: { featureId: features[1].id, userId } });
  }

  // email notifications: 2 votes
  for (const userId of users.slice(0, 2)) {
    await prisma.vote.create({ data: { featureId: features[2].id, userId } });
  }

  // comments: 1 vote
  await prisma.vote.create({ data: { featureId: features[3].id, userId: users[0] } });

  // feature status: 0 votes

  console.log("✅ Seeded:");
  console.log(`  - ${features.length} features`);
  console.log(`  - dark mode: 5 votes`);
  console.log(`  - export CSV: 3 votes`);
  console.log(`  - email notifications: 2 votes`);
  console.log(`  - comments: 1 vote`);
  console.log(`  - feature status labels: 0 votes`);

  db.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
