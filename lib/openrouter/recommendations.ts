import { createChatCompletion } from "./client";

export const RECOMMEND_PROMPT = `
You are KotobaLab AI generating personalized study recommendations.
Analyze the user's recent performance data and return a JSON object (no markdown, pure JSON):

{
  "focusArea": "string — the #1 thing to study today",
  "reason": "string — why this is their weak point",
  "suggestedActivities": [
    { "type": "quiz|flashcard|reading", "topic": "string", "duration": number },
    { "type": "quiz|flashcard|reading", "topic": "string", "duration": number }
  ],
  "motivationalTip": "string — short, specific encouragement"
}
`;

export async function getRecommendations(performanceData: any) {
  return createChatCompletion({
    messages: [
      { role: "system", content: RECOMMEND_PROMPT },
      {
        role: "user",
        content: `User Performance Data: ${JSON.stringify(performanceData)}`,
      },
    ],
    response_format: { type: "json_object" },
  });
}
