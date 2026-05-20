"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { nanoid } from "nanoid";
import type { Message, Role, RiskAssessment } from "@/lib/types";
import { shouldBreakConversation } from "@/lib/types";
import { renderRichText } from "@/lib/format";
import { CrisisCard } from "./CrisisCard";
import { EthicsDrawer } from "./EthicsDrawer";

function makeMessage(role: Role, content: string): Message {
  return {
    id: nanoid(),
    role,
    content,
    createdAt: Date.now(),
  };
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showEthics, setShowEthics] = useState(false);
  const [, startTransition] = useTransition();

  const scrollAnchor = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Dev-only URL trigger so the crisis and ethics screens are demoable
  // without firing the live classifier. Disabled in production.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("demo") === "crisis") setShowCrisis(true);
      if (params.get("demo") === "ethics") setShowEthics(true);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streamingId]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || streamingId) return;

    const userMsg = makeMessage("user", trimmed);
    const assistantMsg = makeMessage("assistant", "");
    const assistantId = assistantMsg.id;

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setStreamingId(assistantId);

    classifyInBackground(trimmed);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        appendToAssistant(
          assistantId,
          "\n\nSomething went wrong on my side. If this keeps happening, please try again in a moment."
        );
        return;
      }

      await readSSE(res.body, (text) => {
        startTransition(() => {
          appendToAssistant(assistantId, text);
        });
      });
    } catch {
      appendToAssistant(
        assistantId,
        "\n\nI lost the connection. Please try again."
      );
    } finally {
      setStreamingId(null);
    }
  }

  function appendToAssistant(id: string, text: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: m.content + text } : m))
    );
  }

  async function classifyInBackground(message: string) {
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) return;
      const data: RiskAssessment = await res.json();
      if (shouldBreakConversation(data.level)) {
        setShowCrisis(true);
      }
    } catch {
      // silent — classifier failure does not block the conversation.
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  const empty = messages.length === 0;

  return (
    <>
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-6 sm:px-8">
        <header className="flex items-center justify-between pt-8 pb-4">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl text-ink">Mbwira</span>
            <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
          </div>
          <button
            onClick={() => setShowEthics(true)}
            className="text-[11px] uppercase tracking-[0.12em] text-stone hover:text-ink transition-colors"
          >
            What this will not do
          </button>
        </header>

        <main className="flex-1 flex flex-col">
          {empty ? <EmptyState /> : <MessageList messages={messages} />}
          <div ref={scrollAnchor} />
        </main>

        <footer className="sticky bottom-0 bg-bone pt-4 pb-6">
          <div className="border-t border-mist pt-4">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={empty ? "What's heavy today?" : "Keep going."}
              rows={1}
              disabled={!!streamingId}
              className="w-full resize-none bg-transparent text-[17px] leading-relaxed text-ink placeholder:text-stone focus:outline-none disabled:opacity-50"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[11px] text-stone">
                {streamingId
                  ? "Mbwira is listening."
                  : "Press Enter to send. Shift + Enter for a new line."}
              </p>
              <button
                onClick={() => void send()}
                disabled={!input.trim() || !!streamingId}
                className="text-[11px] uppercase tracking-[0.12em] text-ink hover:text-clay transition-colors disabled:text-stone disabled:cursor-not-allowed"
              >
                Send →
              </button>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-stone">
            I am an AI built by a student at ALU. I am not a therapist.
            Conversations vanish when you close this tab.
          </p>
        </footer>
      </div>

      {showCrisis && (
        <CrisisCard onAcknowledge={() => setShowCrisis(false)} />
      )}
      <EthicsDrawer open={showEthics} onClose={() => setShowEthics(false)} />
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col justify-center py-20">
      <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
        A first door
      </p>
      <h1 className="font-serif text-5xl sm:text-6xl text-ink mt-6 leading-tight">
        Speak to me.
      </h1>
      <p className="mt-6 text-[16px] leading-relaxed text-stone max-w-md">
        I am Mbwira. Anonymous. Kinyarwanda, English, or French — whichever
        comes first. I will listen before I say anything back.
      </p>
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col gap-8 py-8">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className="animate-fade-in">
      <p className="text-[11px] uppercase tracking-[0.12em] text-stone mb-2">
        {isUser ? "You" : "Mbwira"}
      </p>
      <div
        className={
          isUser
            ? "text-[17px] leading-relaxed text-ink whitespace-pre-wrap"
            : "font-serif text-[19px] leading-relaxed text-ink"
        }
      >
        {message.content ? (
          isUser ? (
            message.content
          ) : (
            renderRichText(message.content)
          )
        ) : (
          <span className="text-stone italic">listening…</span>
        )}
      </div>
    </div>
  );
}

async function readSSE(
  stream: ReadableStream<Uint8Array>,
  onDelta: (text: string) => void
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const evt of events) {
      const lines = evt.split("\n");
      const eventLine = lines.find((l) => l.startsWith("event: "));
      const dataLine = lines.find((l) => l.startsWith("data: "));
      if (!eventLine || !dataLine) continue;
      const type = eventLine.slice(7).trim();
      const payload = dataLine.slice(6);
      if (type === "delta") {
        try {
          const { text } = JSON.parse(payload) as { text: string };
          onDelta(text);
        } catch {
          // ignore malformed event
        }
      }
    }
  }
}
