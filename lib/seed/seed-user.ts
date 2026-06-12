import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { 
  users, 
  userProfiles, 
  studyLogs, 
  flashcardDecks, 
  flashcards, 
  achievements, 
  userAchievements,
  quizSessions
} from "../db/schema";

async function seedUser() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  console.log("🌱 Seeding user Dikatzy...");

  // 1. Clean up existing user if any
  const existingUsers = await db.select().from(users).where(eq(users.email, "dikatzy@kotobalab.app"));
  if (existingUsers.length > 0) {
    console.log("  ⚠️ Existing user found. Deleting previous Dikatzy data...");
    await db.delete(users).where(eq(users.email, "dikatzy@kotobalab.app"));
    console.log("  ✅ Previous data cleaned up");
  }

  // 2. Insert User
  console.log("  👤 Creating user Dikatzy...");
  const [user] = await db.insert(users).values({
    name: "Dikatzy",
    email: "dikatzy@kotobalab.app",
    password: "Strongest.487", // Plaintext for now since no auth is set up yet
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dikatzy",
  }).returning();

  console.log(`  ✅ User created with ID: ${user.id}`);

  // 3. Create User Profile
  console.log("  📊 Creating user profile...");
  await db.insert(userProfiles).values({
    userId: user.id,
    xp: 1250,
    level: 5,
    streakCount: 5,
    longestStreak: 12,
    lastStudiedAt: new Date(),
    dailyGoalMins: 20,
    preferredLang: "en",
    jlptTarget: "n3",
    toeflTarget: 550,
  });
  console.log("  ✅ Profile created");

  // 4. Create 7 days of Study Logs
  console.log("  📅 Generating 7 days of study history...");
  const logs = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    // Vary study time and XP
    const minStudied = Math.floor(Math.random() * 30) + 15; // 15-45 mins
    const xpEarned = minStudied * 5; // 75-225 XP
    
    logs.push({
      userId: user.id,
      date: dateStr,
      minStudied,
      xpEarned,
      sessions: Math.random() > 0.5 ? 2 : 1,
    });
  }
  await db.insert(studyLogs).values(logs);
  console.log("  ✅ Study logs created");

  // 5. Create default Flashcard Deck
  console.log("  🎴 Creating flashcard deck...");
  const [deck] = await db.insert(flashcardDecks).values({
    userId: user.id,
    name: "JLPT N3 Vocabulary",
    description: "Core N3 vocabulary words with Kanji and Furigana",
    subject: "jlpt",
    level: "n3",
    isDefault: true,
    cardCount: 5,
  }).returning();

  // 6. Create Flashcards
  console.log("  🎴 Seeding flashcards...");
  const cards = [
    {
      deckId: deck.id,
      userId: user.id,
      front: "猫",
      back: "Cat",
      furigana: "ねこ",
      example: "猫が大好きです。 (I love cats.)",
      tags: JSON.stringify(["noun", "animals"]),
      difficulty: 3, // Mastered level
      interval: 10,
    },
    {
      deckId: deck.id,
      userId: user.id,
      front: "図書館",
      back: "Library",
      furigana: "としょかん",
      example: "図書館で勉強します。 (I will study at the library.)",
      tags: JSON.stringify(["noun", "places"]),
      difficulty: 2,
      interval: 4,
    },
    {
      deckId: deck.id,
      userId: user.id,
      front: "食べる",
      back: "To eat",
      furigana: "たべる",
      example: "寿司を食べました。 (I ate sushi.)",
      tags: JSON.stringify(["verb", "actions"]),
      difficulty: 4,
      interval: 20,
    },
    {
      deckId: deck.id,
      userId: user.id,
      front: "美味しい",
      back: "Delicious",
      furigana: "おいしい",
      example: "このラーメンは美味しいです。 (This ramen is delicious.)",
      tags: JSON.stringify(["adjective", "food"]),
      difficulty: 1,
      interval: 1,
    },
    {
      deckId: deck.id,
      userId: user.id,
      front: "勉強",
      back: "Study",
      furigana: "べんきょう",
      example: "日本語を勉強する。 (To study Japanese.)",
      tags: JSON.stringify(["noun", "education"]),
      difficulty: 0,
      interval: 1,
    },
  ];
  await db.insert(flashcards).values(cards);
  console.log("  ✅ Flashcards seeded");

  // 7. Associate Achievements
  console.log("  🏆 Awarding achievements...");
  // Fetch some existing achievements
  const dbAchievements = await db.select().from(achievements).limit(3);
  if (dbAchievements.length > 0) {
    const userAchData = dbAchievements.map(a => ({
      userId: user.id,
      achievementId: a.id,
      earnedAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000), // earned in last 3 days
    }));
    await db.insert(userAchievements).values(userAchData).onConflictDoNothing();
    console.log(`  ✅ Awarded ${dbAchievements.length} achievements`);
  } else {
    console.log("  ⚠️ No achievements found to award. Make sure run-seed.ts was run.");
  }

  // 8. Create a Quiz Session
  console.log("  📝 Creating quiz session history...");
  await db.insert(quizSessions).values({
    userId: user.id,
    subject: "jlpt",
    level: "n3",
    category: "vocabulary",
    mode: "practice",
    totalQ: 5,
    correctQ: 4,
    timeTakenSec: 120,
    xpEarned: 80,
    completedAt: new Date(),
  });
  console.log("  ✅ Quiz session history created");

  console.log("🌸 Dikatzy seed complete!");
}

seedUser().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
