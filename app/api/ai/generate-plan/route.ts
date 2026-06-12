import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";

const SYSTEM_PROMPT = `
You are KotobaLab AI, an expert Japanese language study planner for Indonesian students.
Create a personalized weekly study schedule based on the student's profile.
Break down tasks day-by-day (Monday to Sunday) with concrete, actionable items.
IMPORTANT: You MUST write the task descriptions in Indonesian (Bahasa Indonesia).

The output MUST be a strict, valid JSON object with the exact following structure. 
Do NOT wrap the JSON in markdown code blocks, just return the raw JSON object.

{
  "days": [
    {
      "day": "Monday",
      "tasks": [
        { "t": "[Deskripsi tugas dalam Bahasa Indonesia]", "category": "grammar|vocabulary|kanji|reading|listening|exam|review", "timeMinutes": 15 }
      ]
    },
    {
      "day": "Tuesday",
      "tasks": [...]
    }
  ]
}

Guidelines:
- Include all 7 days (Monday through Sunday)
- Each day should have 2-4 tasks
- Mix different skill areas throughout the week
- Lighter workload on weekends
- Focus extra attention on weak areas
- Include review/revision sessions
- Be specific about what to study (e.g., "Tata Bahasa N4: Bentuk Pengandaian たら vs ば" not just "Belajar Grammar")
- Include flashcard review sessions
- Add mock exam practice at least once per week
`;

export async function POST(req: Request) {
  try {
    const { level = "N4", target = "JLPT N4", weakAreas = [], studyHoursPerDay = 1 } = await req.json();

    const userPrompt = `Please generate a weekly study plan for me.
Current Level: ${level}
Target Exam: ${target}
Weak Areas: ${weakAreas.length > 0 ? weakAreas.join(", ") : "No specific weak areas identified yet"}
Available Study Time: ~${studyHoursPerDay} hour(s) per day`;

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 2048,
      temperature: 0.7,
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
      console.error("[AI Generate Plan] JSON Parse Error:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response into JSON format." },
        { status: 500 }
      );
    }

    if (!parsed.days || !Array.isArray(parsed.days)) {
      return NextResponse.json(
        { error: "Invalid response format from AI." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("[AI Generate Plan Error]", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
