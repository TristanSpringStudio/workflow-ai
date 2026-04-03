import { streamText, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { INTERVIEW_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: INTERVIEW_SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
}
