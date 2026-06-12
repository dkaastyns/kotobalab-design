import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizSessions, quizAnswers, userProfiles, studyLogs, questions } from "@/lib/db/schema";
import { eq, sql, inArray } from "drizzle-orm";
import { XP_REWARDS, calculateLevel } from "@/lib/gamification/xp";

export async function POST(req: Request) {
  try {
    const { userId, level, category, mode, answers } = await req.json();

    if (!userId || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "userId and answers[] are required" },
        { status: 400 }
      );
    }

    // Determine subject from level
    const subject = level?.startsWith("toefl") ? "toefl" : "jlpt";

    // Fetch correct answers for validation
    const questionIds = answers.map((a: { questionId: string }) => a.questionId);
    const questionData = await db
      .select({ id: questions.id, answer: questions.answer })
      .from(questions)
      .where(inArray(questions.id, questionIds));

    const correctMap = new Map(questionData.map((q) => [q.id, q.answer]));

    // Calculate scores
    let correctCount = 0;
    const processedAnswers = answers.map((a: { questionId: string; answer: string; timeSec: number }) => {
      const isCorrect = correctMap.get(a.questionId) === a.answer;
      if (isCorrect) correctCount++;
      return {
        questionId: a.questionId,
        userAnswer: a.answer,
        isCorrect,
        timeSec: a.timeSec || 0,
      };
    });

    const totalQ = answers.length;
    const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

    // Calculate XP
    let xpEarned = correctCount * XP_REWARDS.CORRECT_ANSWER;
    xpEarned += XP_REWARDS.QUIZ_COMPLETION;

    if (accuracy === 100) xpEarned += XP_REWARDS.PERFECT_QUIZ;
    if (mode === "exam" && accuracy >= 70) xpEarned += XP_REWARDS.EXAM_PASS;
    if (mode === "exam") xpEarned += XP_REWARDS.EXAM_COMPLETION;

    // Create quiz session
    const [session] = await db
      .insert(quizSessions)
      .values({
        userId,
        subject,
        level: level || "n5",
        category: category || null,
        mode: mode || "practice",
        totalQ,
        correctQ: correctCount,
        xpEarned,
        completedAt: new Date(),
      })
      .returning();

    // Insert individual answers
    for (const ans of processedAnswers) {
      await db.insert(quizAnswers).values({
        sessionId: session.id,
        ...ans,
      });
    }

    // Update user profile XP and streak
    const today = new Date().toISOString().split("T")[0];

    // Get current profile
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));

    if (profile) {
      const lastStudied = profile.lastStudiedAt
        ? profile.lastStudiedAt.toISOString().split("T")[0]
        : null;

      let newStreak = profile.streakCount;
      if (lastStudied !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (lastStudied === yesterdayStr) {
          newStreak = profile.streakCount + 1;
        } else if (lastStudied !== today) {
          newStreak = 1; // Reset streak
        }
      }

      const newXp = profile.xp + xpEarned;
      const newLevel = calculateLevel(newXp);

      // Streak bonuses
      if (newStreak === 7) xpEarned += XP_REWARDS.STREAK_BONUS_7;
      if (newStreak === 30) xpEarned += XP_REWARDS.STREAK_BONUS_30;

      await db
        .update(userProfiles)
        .set({
          xp: newXp,
          level: newLevel,
          streakCount: newStreak,
          longestStreak: Math.max(newStreak, profile.longestStreak),
          lastStudiedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(userProfiles.userId, userId));
    }

    // Upsert study log
    await db
      .insert(studyLogs)
      .values({
        userId,
        date: today,
        xpEarned,
        sessions: 1,
        minStudied: Math.round(answers.reduce((sum: number, a: { timeSec: number }) => sum + (a.timeSec || 0), 0) / 60),
      })
      .onConflictDoUpdate({
        target: [studyLogs.userId, studyLogs.date],
        set: {
          xpEarned: sql`${studyLogs.xpEarned} + ${xpEarned}`,
          sessions: sql`${studyLogs.sessions} + 1`,
          minStudied: sql`${studyLogs.minStudied} + ${Math.round(answers.reduce((sum: number, a: { timeSec: number }) => sum + (a.timeSec || 0), 0) / 60)}`,
        },
      });

    return NextResponse.json({
      sessionId: session.id,
      correct: correctCount,
      total: totalQ,
      accuracy,
      xpEarned,
      newBadges: [],
    });
  } catch (error: unknown) {
    console.error("[JLPT Submit Error]", error);
    return NextResponse.json(
      { error: "Failed to submit answers" },
      { status: 500 }
    );
  }
}
