import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";

const SYSTEM_PROMPT = `
You are KotobaLab AI, an expert Japanese language tutor for Indonesian students.
Your task is to provide a deep, engaging explanation for a given Japanese word or kanji in Indonesian.
You must output a strict, valid JSON object with the exact following structure. Do NOT wrap the JSON in markdown blocks like \`\`\`json. Just return the pure JSON object.

{
  "examples": [
    {
      "japanese": "[A natural Japanese sentence using the word]",
      "romaji": "[Romaji reading of the sentence]",
      "english": "[Indonesian translation]"
    },
    {
      "japanese": "[Another sentence]",
      "romaji": "[Romaji]",
      "english": "[Indonesian]"
    }
  ],
  "grammarNote": "[Penjelasan singkat dalam Bahasa Indonesia mengenai penggunaan atau nuansa tata bahasanya. Maksimal 2-3 kalimat.]",
  "mnemonic": "[Trik mengingat (mnemonic) yang seru dalam Bahasa Indonesia untuk membantu mengingat kata/kanji ini.]"
}
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { word, reading, meaning } = body;

    if (!word) {
      return NextResponse.json({ error: "Word is required" }, { status: 400 });
    }

    const userPrompt = `Please explain this Japanese word/kanji:\nWord: ${word}\nReading: ${reading || "N/A"}\nMeaning: ${meaning || "N/A"}`;

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    let content = completion.choices[0]?.message?.content || "";
    
    // Extract JSON by finding the first { and last }
    const firstBrace = content.indexOf('{');
    const lastBrace = content.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      content = content.substring(firstBrace, lastBrace + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error("[AI Explain Word] JSON Parse Error:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response into JSON format." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("[AI Explain Word Error]", error);
    return NextResponse.json(
      { error: error?.message || "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
