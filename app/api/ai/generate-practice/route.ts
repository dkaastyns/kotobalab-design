import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";

const SYSTEM_PROMPT = `
You are KotobaLab AI, an expert Japanese language tutor and curriculum designer for Indonesian students.
Your task is to generate ONE highly detailed, challenging, and educational Japanese language practice question.
IMPORTANT: Output all text, explanations, instructions, and translations in Indonesian (Bahasa Indonesia).

The output MUST be a strict, valid JSON object with the exact following structure. Do NOT wrap the JSON in markdown code blocks (\`\`\`json ... \`\`\`), just return the raw JSON object.

{
  "level": "[Requested JLPT Level, e.g., N4]",
  "difficulty": "[Easy, Medium, or Hard]",
  "prompt": "[The question sentence in Japanese. Use a blank like ＿＿＿ if it's a fill-in-the-blank]",
  "instruction": "[Indonesian instruction for the student, e.g., 'Pilihlah kata yang paling tepat untuk mengisi bagian yang kosong.']",
  "choices": [
    { "id": "a", "label": "[Japanese choice A]", "text": "[Indonesian meaning/reading of A]" },
    { "id": "b", "label": "[Japanese choice B]", "text": "[Indonesian meaning/reading of B]" },
    { "id": "c", "label": "[Japanese choice C]", "text": "[Indonesian meaning/reading of C]" },
    { "id": "d", "label": "[Japanese choice D]", "text": "[Indonesian meaning/reading of D]" }
  ],
  "correct": "[a, b, c, or d]",
  "explanation": "[Brief explanation in Indonesian of why the correct answer is right and why the others are wrong. Do not use Markdown bold **]",
  "aiExplanation": "[A deep, detailed, and friendly AI explanation in Indonesian that acts as a mini-lesson. Break down the grammar/vocabulary clearly. Do not use Markdown bold **]",
  "relatedGrammar": ["[Grammar point 1]", "[Grammar point 2]"],
  "relatedVocabulary": ["[Word 1] — [Indonesian Meaning 1]", "[Word 2] — [Indonesian Meaning 2]"],
  "suggestedPractice": ["[Suggested practice topic 1 in Indonesian]", "[Suggested practice topic 2 in Indonesian]"]
}

Make sure the question tests real proficiency. Ensure all fields are filled.
`;

export async function POST(req: Request) {
  try {
    const { level = "N4", weakAreas = [] } = await req.json();

    let userPrompt = `Please generate a ${level} practice question.`;
    if (weakAreas && weakAreas.length > 0) {
      userPrompt += ` Focus on these weak areas if possible: ${weakAreas.join(", ")}.`;
    }

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1024,
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
      console.error("[AI Generate Practice] JSON Parse Error:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response into JSON format." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("[AI Generate Practice Error]", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
