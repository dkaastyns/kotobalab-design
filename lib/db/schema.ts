import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  varchar,
  jsonb,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── USERS ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (t) => ({
    providerIdx: uniqueIndex("accounts_provider_idx").on(
      t.provider,
      t.providerAccountId
    ),
  })
);

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: text("session_token").notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});

// ─── USER PROFILES & GAMIFICATION ────────────────────────────────────────────

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  streakCount: integer("streak_count").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastStudiedAt: timestamp("last_studied_at"),
  dailyGoalMins: integer("daily_goal_mins").default(20).notNull(),
  preferredLang: varchar("preferred_lang", { length: 10 }).default("en"),
  jlptTarget: varchar("jlpt_target", { length: 4 }), // n5 | n4 | n3 | n2
  toeflTarget: integer("toefl_target"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  xpReward: integer("xp_reward").default(0).notNull(),
  icon: text("icon").notNull(), // emoji or icon name
  category: varchar("category", { length: 50 }).notNull(), // streak|accuracy|volume|milestone
  condition: jsonb("condition").notNull(), // { type, threshold }
});

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    achievementId: uuid("achievement_id")
      .notNull()
      .references(() => achievements.id),
    earnedAt: timestamp("earned_at").defaultNow().notNull(),
  },
  (t) => ({
    uniqueUserAchievement: uniqueIndex("unique_user_achievement").on(
      t.userId,
      t.achievementId
    ),
  })
);

// ─── QUESTIONS & CONTENT ──────────────────────────────────────────────────────

export const questions = pgTable(
  "questions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    subject: varchar("subject", { length: 20 }).notNull(), // jlpt | toefl
    level: varchar("level", { length: 30 }).notNull(), // n5|n4|n3|n2|toefl_reading etc
    category: varchar("category", { length: 30 }).notNull(), // vocabulary|grammar|reading|kanji
    type: varchar("type", { length: 30 }).notNull(), // multiple_choice|fill_blank etc
    difficulty: integer("difficulty").default(1).notNull(), // 1 easy → 5 hard
    question: text("question").notNull(),
    options: jsonb("options").notNull(), // string[]
    answer: text("answer").notNull(), // correct option text
    explanation: text("explanation"), // base explanation
    tags: jsonb("tags").default("[]"), // string[]
    audioUrl: text("audio_url"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    subjectLevelIdx: index("questions_subject_level_idx").on(
      t.subject,
      t.level
    ),
    categoryIdx: index("questions_category_idx").on(t.category),
    difficultyIdx: index("questions_difficulty_idx").on(t.difficulty),
  })
);

// ─── QUIZ SESSIONS ────────────────────────────────────────────────────────────

export const quizSessions = pgTable(
  "quiz_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    subject: varchar("subject", { length: 20 }).notNull(),
    level: varchar("level", { length: 30 }).notNull(),
    category: varchar("category", { length: 30 }),
    mode: varchar("mode", { length: 20 }).notNull(), // practice | exam
    totalQ: integer("total_q").notNull(),
    correctQ: integer("correct_q").default(0).notNull(),
    timeTakenSec: integer("time_taken_sec"),
    xpEarned: integer("xp_earned").default(0).notNull(),
    completedAt: timestamp("completed_at"),
    startedAt: timestamp("started_at").defaultNow().notNull(),
  },
  (t) => ({
    userIdx: index("quiz_sessions_user_idx").on(t.userId),
    completedIdx: index("quiz_sessions_completed_idx").on(t.completedAt),
  })
);

export const quizAnswers = pgTable(
  "quiz_answers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => quizSessions.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id),
    userAnswer: text("user_answer"),
    isCorrect: boolean("is_correct").notNull(),
    timeSec: integer("time_sec"),
  },
  (t) => ({
    sessionIdx: index("quiz_answers_session_idx").on(t.sessionId),
  })
);

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────

export const flashcardDecks = pgTable("flashcard_decks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  subject: varchar("subject", { length: 20 }),
  level: varchar("level", { length: 30 }),
  isDefault: boolean("is_default").default(false),
  cardCount: integer("card_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const flashcards = pgTable(
  "flashcards",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    deckId: uuid("deck_id")
      .notNull()
      .references(() => flashcardDecks.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    front: text("front").notNull(), // question/word
    back: text("back").notNull(), // answer/meaning
    furigana: text("furigana"), // Japanese reading aid
    example: text("example"),
    tags: jsonb("tags").default("[]"),
    difficulty: integer("difficulty").default(0).notNull(), // 0 new → 4 mastered
    nextReviewAt: timestamp("next_review_at").defaultNow(),
    interval: integer("interval").default(1).notNull(), // days (SRS)
    easeFactor: real("ease_factor").default(2.5).notNull(), // SM-2 algorithm
    reviewCount: integer("review_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    deckIdx: index("flashcards_deck_idx").on(t.deckId),
    reviewIdx: index("flashcards_review_idx").on(t.nextReviewAt),
  })
);

// ─── BOOKMARKS ────────────────────────────────────────────────────────────────

export const bookmarks = pgTable(
  "bookmarks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 20 }).notNull(), // question | grammar | vocabulary
    refId: uuid("ref_id").notNull(), // ID of referenced item
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    userTypeIdx: index("bookmarks_user_type_idx").on(t.userId, t.type),
    uniqueBookmark: uniqueIndex("unique_bookmark").on(
      t.userId,
      t.type,
      t.refId
    ),
  })
);

// ─── DAILY CHALLENGES ─────────────────────────────────────────────────────────

export const dailyChallenges = pgTable("daily_challenges", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: varchar("date", { length: 10 }).notNull().unique(), // YYYY-MM-DD
  questionIds: jsonb("question_ids").notNull(), // uuid[]
  subject: varchar("subject", { length: 20 }).notNull(),
  xpReward: integer("xp_reward").default(50).notNull(),
});

export const userDailyChallenges = pgTable(
  "user_daily_challenges",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    challengeId: uuid("challenge_id")
      .notNull()
      .references(() => dailyChallenges.id),
    score: integer("score").notNull(),
    completedAt: timestamp("completed_at").defaultNow().notNull(),
  },
  (t) => ({
    uniqueUserChallenge: uniqueIndex("unique_user_challenge").on(
      t.userId,
      t.challengeId
    ),
  })
);

// ─── AI TUTOR HISTORY ─────────────────────────────────────────────────────────

export const aiTutorSessions = pgTable(
  "ai_tutor_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    topic: varchar("topic", { length: 100 }), // grammar|vocabulary|kanji|reading
    messages: jsonb("messages").notNull().default("[]"), // { role, content, ts }[]
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    userIdx: index("ai_tutor_user_idx").on(t.userId),
  })
);

// ─── STUDY ANALYTICS ──────────────────────────────────────────────────────────

export const studyLogs = pgTable(
  "study_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD
    minStudied: integer("min_studied").default(0).notNull(),
    xpEarned: integer("xp_earned").default(0).notNull(),
    sessions: integer("sessions").default(0).notNull(),
  },
  (t) => ({
    userDateIdx: uniqueIndex("study_logs_user_date_idx").on(
      t.userId,
      t.date
    ),
  })
);

// ─── RELATIONS ────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  accounts: many(accounts),
  sessions: many(sessions),
  quizSessions: many(quizSessions),
  flashcardDecks: many(flashcardDecks),
  bookmarksList: many(bookmarks),
  userAchievements: many(userAchievements),
  studyLogs: many(studyLogs),
  aiTutorSessions: many(aiTutorSessions),
}));

export const quizSessionsRelations = relations(
  quizSessions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [quizSessions.userId],
      references: [users.id],
    }),
    answers: many(quizAnswers),
  })
);

export const flashcardDecksRelations = relations(
  flashcardDecks,
  ({ one, many }) => ({
    user: one(users, {
      fields: [flashcardDecks.userId],
      references: [users.id],
    }),
    cards: many(flashcards),
  })
);
