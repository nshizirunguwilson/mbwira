import Anthropic from "@anthropic-ai/sdk";

let cached: Anthropic | null = null;

export function getAnthropic(): Anthropic | null {
  if (cached) return cached;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  cached = new Anthropic({ apiKey });
  return cached;
}

export const NO_KEY_BODY = {
  error: "Server is not configured.",
  detail: "ANTHROPIC_API_KEY is not set on this deployment.",
} as const;

export const CHAT_MODEL =
  process.env.ANTHROPIC_CHAT_MODEL ?? "claude-sonnet-4-6";

export const CRISIS_MODEL =
  process.env.ANTHROPIC_CRISIS_MODEL ?? "claude-haiku-4-5-20251001";
