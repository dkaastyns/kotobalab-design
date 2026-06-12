import { NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/openrouter/client";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/openrouter/tutor";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, topic } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const topicContext = topic
      ? `\nThe student is currently studying: ${topic}. Focus your answer on this area.`
      : "";

    const completion = await createChatCompletion({
      messages: [
        {
          role: "system",
          content: TUTOR_SYSTEM_PROMPT + topicContext,
        },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 2048,
    });

    const responseContent = completion.choices[0]?.message?.content || "";

    return NextResponse.json({
      response: responseContent,
      model: completion.model,
    });
  } catch (error: any) {
    console.error("[AI Tutor Error]", error);
    return NextResponse.json(
      { error: error?.message || "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
