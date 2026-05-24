# Mbwira

**Speak to me.** *— Kinyarwanda*

An anonymous, culturally-grounded companion for young Rwandans. Built on Rwanda's Resilience-Oriented Therapy framework. Not a therapist. A first door.

A solo project for the Claude Builder Club @ ALU Hackathon · Spring 2026 · Track 2 — Neuroscience & Mental Health.

**Live:** [mbwira-chi.vercel.app](https://mbwira-chi.vercel.app)

---

## Why this exists

- Rwanda has thirteen psychiatrists for thirteen million people.
- Twenty-seven percent of Rwandan youth live with a diagnosable psychological disorder.
- Two thousand eight hundred seventy-nine documented suicide attempts in 2023 alone.
- The local language for mental illness is itself dismissive — silence is the deeper wound.

Mbwira is the lamp in the hallway before the room that does not yet exist.

## What it is

A conversational companion that listens in Kinyarwanda, English, or French — and switches mid-sentence. The conversational stance is informed by the Resilience-Oriented Therapy framework developed in Rwanda by Interpeace, not by imported clinical templates. Every user message is silently classified for crisis risk. When risk crosses a threshold, the conversation interrupts and surfaces a human helpline — clearly and on screen.

## What it is **not**

- Not a therapist.
- Not a doctor.
- Not a replacement for the human care Rwanda still needs.

These constraints are encoded directly in the system prompt and the UI. See [`src/lib/prompts/system.ts`](src/lib/prompts/system.ts).

## Architecture

```
Next.js 16 · App Router · Tailwind v4 · TypeScript

src/app/page.tsx          renders <Chat />
src/components/Chat.tsx   conversation state + SSE consumer
src/components/CrisisCard hard handoff to 8015 / RBC 114
src/components/EthicsDrawer "what this will not do"

POST /api/chat       Claude Sonnet 4.6 · streamed SSE
POST /api/classify   Claude Haiku 4.5 · JSON risk level

src/lib/prompts/system.ts   ROT-grounded conversation
src/lib/prompts/crisis.ts   5-level risk classifier
```

Both models use prompt caching on the system prompt to keep cost predictable. Conversation state lives in component memory only — there is no database. Nothing about the user is persisted unless they explicitly opt in (post-hackathon).

## Running locally

1. Copy `.env.local.example` to `.env.local` and add your `ANTHROPIC_API_KEY`.
2. Install:

   ```sh
   npm install
   ```

3. Start:

   ```sh
   npm run dev
   ```

4. Open <http://localhost:3000>.

## Crisis helplines surfaced in-product

- **Suicide-prevention hotline** — `8015` (free, confidential, 24/7)
- **Rwanda Biomedical Center** — `114` (toll-free mental-health line)
- **MindSky Rwanda** — `+250 788 304 782` (youth, Mon–Sat 9am–6pm)
- **CARAES Ndera Neuropsychiatric Hospital** — `2575` (national referral hospital)

Compiled from authoritative public sources (RBC.gov.rw, service sites, national news) in May 2026. The full directory lives in [`src/lib/resources.ts`](src/lib/resources.ts); the crisis card uses `8015` + `114`. A periodic call-check is still wise — numbers change.

## Ethical perimeter

1. **No diagnosis.** Never. Encoded in the system prompt.
2. **No claim to be human.** Disclosed on every conversation.
3. **No crisis handled alone.** Hard UI break to a human.
4. **No memory without permission.** Session-only by default.
5. **No replacement for human care.** Framed as a door, not a destination.

The deck prompt at [`docs/DECK_PROMPT.md`](docs/DECK_PROMPT.md) carries the full ethical and design rationale.

## License

MIT — see [`LICENSE`](LICENSE). Note the appended disclaimer: Mbwira is a
support tool, not a medical device, and anyone deploying a derivative must
verify crisis-helpline details for their region.
