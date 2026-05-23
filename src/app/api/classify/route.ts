import type Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { z } from "zod";
import { getAnthropic, CRISIS_MODEL, NO_KEY_BODY } from "@/lib/anthropic";
import { CRISIS_CLASSIFIER_PROMPT } from "@/lib/prompts/crisis";
import { rateLimit, getClientIp, tooManyRequests } from "@/lib/rate-limit";
import type { RiskAssessment } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  message: z.string().min(1).max(8000),
});

const ResponseShape = z.object({
  level: z.enum(["none", "low", "medium", "high", "imminent"]),
  reason: z.string().max(240),
});

function safeFallback(): RiskAssessment {
  return {
    level: "low",
    reason: "Classifier failed; defaulted upward for safety.",
  };
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(`classify:${getClientIp(req)}`, 30, 60_000);
  if (!rl.ok) return tooManyRequests(rl.resetAt);

  let parsed: z.infer<typeof Body>;
  try {
    parsed = Body.parse(await req.json());
  } catch (err) {
    return Response.json(
      { error: "Invalid request body.", detail: String(err) },
      { status: 400 }
    );
  }

  const client = getAnthropic();
  if (!client) {
    return Response.json(NO_KEY_BODY, { status: 503 });
  }

  try {
    const result = await client.messages.create({
      model: CRISIS_MODEL,
      max_tokens: 120,
      system: [
        {
          type: "text",
          text: CRISIS_CLASSIFIER_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: parsed.message }],
    });

    const text = result.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    try {
      const json = JSON.parse(text);
      const validated = ResponseShape.parse(json);
      return Response.json(validated satisfies RiskAssessment);
    } catch {
      return Response.json(safeFallback());
    }
  } catch {
    return Response.json(safeFallback());
  }
}
