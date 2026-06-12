import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";

export async function POST(req: Request) {
  try {
    const { level = "N4", count = 5 } = await req.json();

    const SYSTEM_PROMPT = `
You are KotobaLab AI, an expert Japanese language tutor and JLPT exam creator.
Your task is to generate a batch of ${count} JLPT mock exam questions.

The output MUST be a strict, valid JSON object with the exact following structure. Do NOT wrap the JSON in markdown code blocks, just return the raw JSON object.

{
  "questions": [
    {
      "prompt": "[The question sentence in Japanese. E.g., 次の文の＿＿に入る最も適切なものを選びなさい。 彼は毎朝コーヒーを＿＿＿飲みます。]",
      "choices": [
        "[Choice 1 in Japanese]",
        "[Choice 2 in Japanese]",
        "[Choice 3 in Japanese]",
        "[Choice 4 in Japanese]"
      ],
      "correct": [0, 1, 2, or 3 representing the index of the correct choice]
    }
  ]
}

Ensure the questions are realistic, grammatically correct, and cover a mix of vocabulary and grammar. Ensure all ${count} questions are returned.
`;

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Please generate ${count} ${level} mock exam questions.` },
      ],
      max_tokens: 1500,
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
      console.error("[AI Generate Exam] JSON Parse Error:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response into JSON format." },
        { status: 500 }
      );
    }

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      return NextResponse.json(
        { error: "Invalid response format from AI." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("[AI Generate Exam Error]", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
