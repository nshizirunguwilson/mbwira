"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "mbwira_onboarded_v1";

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Only decide on the client — localStorage isn't available during SSR,
  // and showing the modal flicker-free on first visit is more important
  // than rendering it during the initial HTML pass.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    } catch {
      // Private mode, locked-down browser, etc. — fail open: show the modal.
      setOpen(true);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!open) return;
    buttonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // Best effort; if storage fails we'll just show it again next visit.
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bone/95 px-6 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-heading"
    >
      <div className="w-full max-w-lg">
        <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
          Before you begin
        </p>
        <h2
          id="onboarding-heading"
          className="font-serif text-4xl leading-tight text-ink mt-4"
        >
          A few honest things.
        </h2>

        <div className="mt-10 space-y-6 text-[16px] leading-relaxed text-ink">
          <p>
            I am Mbwira. I am an AI — not a therapist, and not a doctor.
          </p>
          <p>
            Your words are sent to Anthropic to write a reply, then let go. I
            keep nothing — no account, no history, nothing once you close this
            tab.
          </p>
          <p>
            If you need a human right now, please call one of these instead of
            writing to me:
          </p>
        </div>

        <div className="mt-6 border-t border-mist pt-6 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
              Rwanda Biomedical Center
            </p>
            <a
              href="tel:114"
              className="font-serif text-xl text-ink underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-clay hover:decoration-clay"
            >
              114
            </a>
            <span className="text-[13px] text-stone ml-3">
              free · 24/7 · Kinyarwanda
            </span>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
              Suicide-prevention hotline
            </p>
            <a
              href="tel:8015"
              className="font-serif text-xl text-ink underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-clay hover:decoration-clay"
            >
              8015
            </a>
            <span className="text-[13px] text-stone ml-3">
              free · confidential · 24/7
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <p className="text-[13px] text-stone max-w-xs">
            By continuing, you understand the above.
          </p>
          <button
            ref={buttonRef}
            onClick={dismiss}
            className="rounded-full border border-ink px-5 py-2 text-[12px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
          >
            I understand · begin →
          </button>
        </div>
      </div>
    </div>
  );
}
