import { createChatCompletion } from "./client";

export const PLANNER_SYSTEM_PROMPT = `
You are KotobaLab AI generating personalized study plans.
Create a structured weekly study schedule based on the student's target level and focus areas.
Break down tasks day-by-day (Monday to Sunday) with concrete actions.
`;

export async function generateWeeklyPlan(level: string, target: string, weakAreas: string[]) {
  return createChatCompletion({
    messages: [
      { role: "system", content: PLANNER_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Current Level: ${level}\nTarget Exam: ${target}\nWeak Areas: ${weakAreas.join(", ")}`,
      },
    ],
  });
}
