import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { questions } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level") || "n5";
    const category = searchParams.get("category");
    const count = Math.min(parseInt(searchParams.get("count") || "10"), 50);
    const mode = searchParams.get("mode") || "practice";
    const difficulty = searchParams.get("difficulty")
      ? parseInt(searchParams.get("difficulty")!)
      : null;

    // Determine subject from level
    const subject = level.startsWith("toefl") ? "toefl" : "jlpt";

    // Build conditions
    const conditions = [
      eq(questions.subject, subject),
      eq(questions.level, level),
    ];

    if (category) {
      conditions.push(eq(questions.category, category));
    }

    if (mode === "practice" && difficulty) {
      conditions.push(eq(questions.difficulty, difficulty));
    }

    const result = await db
      .select()
      .from(questions)
      .where(and(...conditions))
      .orderBy(sql`RANDOM()`)
      .limit(count);

    return NextResponse.json({
      questions: result.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        category: q.category,
        tags: q.tags,
      })),
      total: result.length,
      level,
      mode,
    });
  } catch (error: unknown) {
    console.error("[JLPT Questions Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
