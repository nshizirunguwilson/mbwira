"use client";

import { useEffect } from "react";
import { RESOURCE_GROUPS, type Resource } from "@/lib/resources";

interface ResourcesDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function ResourcesDrawer({ open, onClose }: ResourcesDrawerProps) {
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
        className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-mist bg-bone"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-10">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
              Find a human
            </p>
            <button
              onClick={onClose}
              className="text-xl leading-none text-stone transition-colors hover:text-ink"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <h2 className="mt-6 font-serif text-3xl leading-tight text-ink">
            People you can reach.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone">
            I am a first door, not a destination. When a person is what you
            need, these are real ones to reach for.
          </p>

          <div className="mt-10 space-y-10">
            {RESOURCE_GROUPS.map((group) => (
              <section key={group.label}>
                <p className="text-[11px] uppercase tracking-[0.12em] text-stone">
                  {group.label}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-stone/90">
                  {group.blurb}
                </p>
                <ul className="mt-5 space-y-5">
                  {group.resources.map((r) => (
                    <ResourceItem key={r.name} resource={r} />
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-mist pt-6 text-[12px] leading-relaxed text-stone">
            These are public services in Rwanda, compiled from official
            sources. Numbers can change — if one does not connect, try
            another, or dial 114.
          </p>
        </div>
      </aside>
    </div>
  );
}

function ResourceItem({ resource }: { resource: Resource }) {
  return (
    <li className="border-t border-mist pt-5">
      <p className="font-serif text-lg leading-snug text-ink">
        {resource.name}
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-stone">
        {resource.helpsWith}
      </p>
      <div className="mt-2.5">
        {resource.tel ? (
          <a
            href={`tel:${resource.tel}`}
            className="text-[14px] text-ink underline decoration-mist decoration-1 underline-offset-4 transition-colors hover:text-clay hover:decoration-clay"
          >
            {resource.reach}
          </a>
        ) : (
          <span className="text-[14px] text-ink">{resource.reach}</span>
        )}
      </div>
    </li>
  );
}
