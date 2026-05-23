"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { nanoid } from "nanoid";
import type { Message, Role, RiskAssessment } from "@/lib/types";
import { shouldBreakConversation } from "@/lib/types";
import { renderRichText } from "@/lib/format";
import { CrisisCard } from "./CrisisCard";
import { EthicsDrawer } from "./EthicsDrawer";
import { OnboardingModal } from "./OnboardingModal";

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

  const focusInput = useCallback(() => {
    textareaRef.current?.focus({ preventScroll: true });
  }, []);

  // Keep the conversation pinned to the latest message. Instant while
  // streaming (so it keeps up with tokens), smooth when a turn settles.
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: streamingId ? "auto" : "smooth",
    });
  }, [messages, streamingId]);

  // Auto-grow the composer, capped — past the cap it scrolls internally.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }, [input]);

  // Land in the composer on first paint.
  useEffect(() => {
    focusInput();
  }, [focusInput]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || streamingId) return;

    const userMsg = makeMessage("user", trimmed);
    const assistantMsg = makeMessage("assistant", "");
    const assistantId = assistantMsg.id;

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setStreamingId(assistantId);
    focusInput();

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
      focusInput();
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
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-5 sm:px-8">
        <header className="flex items-center justify-between pt-8 pb-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-xl text-ink">Mbwira</span>
            <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
          </div>
          <button
            onClick={() => setShowEthics(true)}
            className="text-[11px] uppercase tracking-[0.12em] text-stone underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            What this will not do
          </button>
        </header>

        <main className="flex flex-1 flex-col">
          {empty ? <EmptyState /> : <MessageList messages={messages} />}
        </main>

        <footer className="sticky bottom-0 bg-bone pt-3 pb-5">
          <div className="rounded-2xl border border-mist bg-bone px-4 pt-3 pb-2.5 shadow-[0_1px_0_rgba(31,27,22,0.02)] transition-colors focus-within:border-stone">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={empty ? "What's heavy today?" : "Keep going."}
              rows={1}
              className="max-h-[180px] w-full resize-none overflow-y-auto break-words bg-transparent text-[17px] leading-relaxed text-ink placeholder:text-stone/80 focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[11px] text-stone">
                {streamingId
                  ? "Mbwira is listening."
                  : "Enter to send · Shift + Enter for a line break"}
              </p>
              <button
                onClick={() => void send()}
                disabled={!input.trim() || !!streamingId}
                className="rounded-full border border-ink px-4 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-bone disabled:cursor-not-allowed disabled:border-mist disabled:text-stone disabled:hover:bg-transparent disabled:hover:text-stone"
              >
                Send →
              </button>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-stone">
            I am an AI, not a therapist. This conversation vanishes when you
            close the tab.
          </p>
        </footer>
      </div>

      {showCrisis && <CrisisCard onAcknowledge={() => setShowCrisis(false)} />}
      <EthicsDrawer open={showEthics} onClose={() => setShowEthics(false)} />
      <OnboardingModal />
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col justify-center py-16">
      <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
        A first door
      </p>
      <h1 className="mt-5 font-serif text-5xl leading-tight text-ink sm:text-6xl">
        Speak to me.
      </h1>
      <p className="mt-5 max-w-md text-[16px] leading-relaxed text-stone">
        I am Mbwira. Anonymous. Kinyarwanda, English, or French — whichever
        comes first. I will listen before I say anything back.
      </p>
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col gap-7 py-8">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex animate-fade-in justify-end">
        <div className="max-w-[82%] rounded-2xl rounded-br-md bg-mist px-4 py-3 text-[16px] leading-relaxed whitespace-pre-wrap text-ink">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-stone">
        <span className="h-1 w-1 rounded-full bg-clay" aria-hidden />
        Mbwira
      </p>
      <div className="font-serif text-[19px] leading-relaxed text-ink">
        {message.content ? (
          renderRichText(message.content)
        ) : (
          <span className="italic text-stone">listening…</span>
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
