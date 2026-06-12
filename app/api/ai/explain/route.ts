import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";

const EXPLAIN_SYSTEM_PROMPT = `
You are KotobaLab AI helping an Indonesian student understand why they got a Japanese question wrong.
Be kind, specific, deeply educational, and thorough. This is a TEACHING MOMENT.
IMPORTANT: You MUST respond in Indonesian (Bahasa Indonesia). Keep Japanese text intact.

Structure your explanation as follows. DO NOT USE MARKDOWN BOLD (**). Avoid asterisk (*) markers for emphasis or bolding entirely.

1. Jawaban yang Benar
   - State the correct answer clearly in Indonesian
   - Explain the grammar/vocabulary rule in full detail (3-5 sentences minimum in Indonesian)
   - Show the pattern/structure involved
   - Give 2 additional example sentences using the same pattern, with Indonesian translation

2. Kenapa Jawabanmu Salah
   - Explain the specific misconception or trap in Indonesian
   - Show how the wrong answer would be used correctly in a different context
   - Give an example sentence where the wrong answer WOULD be correct

3. Perbedaan Kunci
   - Side-by-side comparison of the correct vs wrong answer in Indonesian
   - When to use each one
   - Quick decision rule (e.g., "Jika kamu melihat X, gunakan Y")

4. Trik Mengingat
   - A fun, memorable mnemonic or association in Indonesian

5. Topik Belajar Terkait
   - 3 related grammar points or vocabulary to review
   - Why they are related in Indonesian

Keep it educational and encouraging.
`;

export async function POST(req: Request) {
  try {
    const { questionText, userAnswer, correctAnswer } = await req.json();

    if (!questionText || !userAnswer || !correctAnswer) {
      return NextResponse.json(
        { error: "questionText, userAnswer, and correctAnswer are required" },
        { status: 400 }
      );
    }

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: EXPLAIN_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Question: "${questionText}"\nUser's Answer: "${userAnswer}"\nCorrect Answer: "${correctAnswer}"`,
        },
      ],
      max_tokens: 1024,
    });

    const explanation = completion.choices[0]?.message?.content || "";

    return NextResponse.json({
      explanation,
      relatedGrammar: [],
      relatedVocabulary: [],
      studyTips: [],
    });
  } catch (error: unknown) {
    console.error("[AI Explain Error]", error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
