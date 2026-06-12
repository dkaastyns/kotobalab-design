import OpenAI from "openai";
import { MODELS } from "./models";

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function createChatCompletion(options: Omit<OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming, "model">) {
  const models = [MODELS.primary, MODELS.secondary, MODELS.tertiary];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`[OpenRouter] Attempting completion using model: ${model}`);
      const completion = await openrouter.chat.completions.create({
        ...options,
        model,
      });
      console.log(`[OpenRouter] Completion succeeded using model: ${model}`);
      return completion;
    } catch (error: any) {
      console.error(`[OpenRouter] Model ${model} failed with:`, error?.message || error);
      lastError = error;
    }
  }

  throw lastError || new Error("All fallback models failed.");
}
