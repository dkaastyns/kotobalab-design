import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";

const SYSTEM_PROMPT = `
You are KotobaLab AI, an expert Japanese language tutor and flashcard creator.
Your task is to generate a batch of new, unique flashcards for a student.

The output MUST be a strict, valid JSON object with the exact following structure. Do NOT wrap the JSON in markdown code blocks, just return the raw JSON object.

{
  "cards": [
    {
      "front": "[Japanese word, kanji, or grammar point]",
      "reading": "[kana reading]",
      "back": "[Indonesian meaning]",
      "example": "[A simple, natural Japanese example sentence]"
    }
  ]
}

Ensure the cards are accurate, useful, and appropriate for the requested JLPT level. Generate exactly the requested number of cards.
`;

export async function POST(req: Request) {
  try {
    const { level = "N4", deck = "Vocabulary", count = 5 } = await req.json();

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Please generate ${count} new flashcards for JLPT ${level} ${deck}. Do not use very basic words like 'to eat' or 'to drink', give slightly challenging ones.` },
      ],
      max_tokens: 1500,
      temperature: 0.8,
    });

    let content = completion.choices[0]?.message?.content || "";
    
    // Extract JSON
    const firstBrace = content.indexOf('{');
    const lastBrace = content.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      content = content.substring(firstBrace, lastBrace + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error("[AI Generate Flashcards] JSON Parse Error:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response into JSON format." },
        { status: 500 }
      );
    }

    if (!parsed.cards || !Array.isArray(parsed.cards)) {
      return NextResponse.json(
        { error: "Invalid response format from AI." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("[AI Generate Flashcards Error]", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
