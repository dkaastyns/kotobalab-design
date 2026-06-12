import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";

const SYSTEM_PROMPT = `
You are KotobaLab AI, an expert Japanese language tutor for Indonesian students.
Your task is to provide a comprehensive breakdown of a given Japanese kanji character in Indonesian.
You must output a strict, valid JSON object. Do NOT wrap the JSON in markdown code blocks. Just return the pure JSON.

{
  "meaning": "[All meanings of the kanji in Indonesian]",
  "onyomi": "[Chinese reading(s) — katakana]",
  "kunyomi": "[Japanese reading(s) — hiragana]",
  "strokes": [number of strokes],
  "jlpt": "[N5/N4/N3/N2/N1]",
  "radicals": [
    { "char": "[radical character]", "meaning": "[meaning in Indonesian]", "position": "[position in kanji e.g., left/right/top/bottom]" }
  ],
  "compounds": [
    { "word": "[compound word in kanji]", "reading": "[kana reading]", "meaning": "[Indonesian meaning]" },
    { "word": "...", "reading": "...", "meaning": "..." },
    { "word": "...", "reading": "...", "meaning": "..." }
  ],
  "examples": [
    { "japanese": "[natural sentence]", "romaji": "[romaji reading]", "indonesian": "[Indonesian translation]" },
    { "japanese": "...", "romaji": "...", "indonesian": "..." }
  ],
  "mnemonic": "[Trik mengingat yang kreatif dan berkesan dalam Bahasa Indonesia, bisa berdasarkan bentuk visual, bunyi, atau cerita]",
  "lookalike": "[Kanji yang mirip secara visual dan cara membedakannya, dalam Bahasa Indonesia. Tulis 'Tidak ada' jika tidak ada]"
}
`;

export async function POST(req: Request) {
  try {
    const { char, meaning, on, kun, level } = await req.json();

    if (!char) {
      return NextResponse.json({ error: "Kanji character is required" }, { status: 400 });
    }

    const userPrompt = `Please give me a comprehensive breakdown of the kanji: ${char}
Known meaning: ${meaning || "N/A"}
On'yomi: ${on || "N/A"}
Kun'yomi: ${kun || "N/A"}
JLPT Level: ${level || "N/A"}`;

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1200,
      temperature: 0.6,
    });

    let content = completion.choices[0]?.message?.content || "";

    const firstBrace = content.indexOf("{");
    const lastBrace = content.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      content = content.substring(firstBrace, lastBrace + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("[AI Explain Kanji] JSON Parse Error:", content);
      return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("[AI Explain Kanji Error]", error);
    return NextResponse.json(
      { error: error?.message || "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
