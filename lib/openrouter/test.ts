import { openrouter } from "./client.js";

const models = [
  "google/gemma-4-31b-it:free",
  "openai/gpt-oss-120b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "qwen/qwen3-coder:free",
  "poolside/laguna-m.1:free"
];

async function test() {
  for (const model of models) {
    console.log("Testing:", model);
    try {
      const res = await openrouter.chat.completions.create({
        model,
        messages: [{ role: "user", content: "Say hi" }],
      });
      console.log("Success:", res.choices[0]?.message?.content);
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  }
}

test();
