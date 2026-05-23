import { NextRequest } from "next/server";
import { z } from "zod";
import { getAnthropic, CHAT_MODEL, NO_KEY_BODY } from "@/lib/anthropic";
import { MBWIRA_SYSTEM_PROMPT } from "@/lib/prompts/system";
import { rateLimit, getClientIp, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      })
    )
    .min(1)
    .max(60),
});

export async function POST(req: NextRequest) {
  const rl = rateLimit(`chat:${getClientIp(req)}`, 20, 60_000);
  if (!rl.ok) return tooManyRequests(rl.resetAt);

  let parsed;
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

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      try {
        const messageStream = client.messages.stream({
          model: CHAT_MODEL,
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: MBWIRA_SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: parsed.messages,
        });

        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            send("delta", { text: event.delta.text });
          }
        }

        const final = await messageStream.finalMessage();
        send("done", {
          stop_reason: final.stop_reason,
          usage: final.usage,
        });
      } catch (err) {
        send("error", { message: String(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  });
}
