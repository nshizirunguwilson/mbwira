"use client";

interface CrisisCardProps {
  onAcknowledge: () => void;
}

export function CrisisCard({ onAcknowledge }: CrisisCardProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bone/95 px-6 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-heading"
    >
      <div className="w-full max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
          A pause
        </p>
        <h2
          id="crisis-heading"
          className="font-serif text-4xl leading-tight text-ink mt-4"
        >
          What you just said matters.
        </h2>
        <p className="mt-6 text-[17px] leading-relaxed text-ink">
          I want to take it seriously. Before we keep talking, please reach out
          to a human who can stay with you tonight. They will answer in
          Kinyarwanda.
        </p>

        <div className="mt-8 border-t border-mist pt-6 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
              Suicide-prevention hotline
            </p>
            <a
              href="tel:8015"
              className="font-serif text-2xl text-ink underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-clay hover:decoration-clay"
            >
              8015
            </a>
            <p className="text-[13px] text-stone mt-1">
              Free, confidential, 24/7.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
              Rwanda Biomedical Center
            </p>
            <a
              href="tel:114"
              className="font-serif text-2xl text-ink underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-clay hover:decoration-clay"
            >
              114
            </a>
            <p className="text-[13px] text-stone mt-1">
              Toll-free mental-health line.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <p className="text-[13px] text-stone max-w-xs">
            I am not going anywhere. When you are ready, you can come back.
          </p>
          <button
            onClick={onAcknowledge}
            className="shrink-0 rounded-full border border-stone px-4 py-1.5 text-[12px] uppercase tracking-[0.12em] text-stone transition-colors hover:border-ink hover:text-ink"
          >
            I have called →
          </button>
        </div>
      </div>
    </div>
  );
}
