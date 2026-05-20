"use client";

import { useEffect } from "react";

interface EthicsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function EthicsDrawer({ open, onClose }: EthicsDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-bone/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <aside
        className="absolute right-0 top-0 h-full w-full max-w-md bg-bone border-l border-mist overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-10">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
              The lines this will not cross
            </p>
            <button
              onClick={onClose}
              className="text-stone hover:text-ink transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <h2 className="font-serif text-3xl leading-tight text-ink mt-6">
            What Mbwira will not do.
          </h2>

          <ul className="mt-10 space-y-6">
            <Line
              title="It will not diagnose."
              body="Not depression, not anxiety, not trauma. Diagnosis is a clinical act."
            />
            <Line
              title="It will not pretend to be human."
              body="It tells you, on first message and any time you ask: I am an AI built by a student."
            />
            <Line
              title="It will not handle a crisis alone."
              body="When risk is detected, the conversation pauses and surfaces a human."
            />
            <Line
              title="It will not remember without permission."
              body="Conversations vanish by default. Memory is opt-in."
            />
            <Line
              title="It will not replace what is missing."
              body="Rwanda needs more psychiatrists. Mbwira is a door, not a destination."
            />
          </ul>

          <p className="mt-12 font-serif text-xl text-ink leading-snug">
            Ethics is not a feature. It is the perimeter.
          </p>

          <p className="mt-10 text-[12px] text-stone">
            Built for the CBC @ ALU Hackathon · May 2026 ·{" "}
            <span className="text-ink">Track 2 — Neuroscience & Mental Health</span>
          </p>
        </div>
      </aside>
    </div>
  );
}

function Line({ title, body }: { title: string; body: string }) {
  return (
    <li className="border-t border-mist pt-6">
      <p className="font-serif text-lg text-ink leading-snug">{title}</p>
      <p className="text-[14px] text-stone mt-2 leading-relaxed">{body}</p>
    </li>
  );
}
