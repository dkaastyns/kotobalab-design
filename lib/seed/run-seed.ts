import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { questions, achievements } from "../db/schema";
import { jlptQuestionsSeed } from "./questions";
import { achievementsSeed } from "./achievements";

async function seed() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  console.log("🌱 Seeding database...");

  // Seed questions
  console.log(`  📝 Inserting ${jlptQuestionsSeed.length} questions...`);
  for (const q of jlptQuestionsSeed) {
    await db.insert(questions).values(q).onConflictDoNothing();
  }
  console.log("  ✅ Questions seeded");

  // Seed achievements
  console.log(`  🏆 Inserting ${achievementsSeed.length} achievements...`);
  for (const a of achievementsSeed) {
    await db.insert(achievements).values(a).onConflictDoNothing();
  }
  console.log("  ✅ Achievements seeded");

  console.log("🌸 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
