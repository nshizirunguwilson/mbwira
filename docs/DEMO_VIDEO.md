# Demo Video — Mbwira (75 seconds)

> Devpost requires a video. The video is the single artifact most judges (and all peer voters) will use to evaluate Mbwira when they cannot be in the room. It also lives on the project page forever. Treat it like the second-most-important deliverable, after the live URL itself.

---

## What this video has to do

In seventy-five seconds, the video must make a stranger feel three things:

1. **The gap is real.** Thirteen psychiatrists for thirteen million people lands in the first ten seconds, before they can look away.
2. **The product works.** They see a real conversation streamed in real time, in mbwira's actual UI, with mbwira's actual voice.
3. **The ethics are visible, not implied.** The crisis-handoff card mounting on screen is the moment that earns the Loving Grace argument.

If the video does these three things in seventy-five seconds, it has done its job. Anything else is decoration.

## Constraints

- **Length:** 75 seconds (Devpost allows up to three minutes; shorter wins. Sixty to ninety is the sweet spot for retention.)
- **Resolution:** 1080p minimum, 1920x1080 mp4, H.264.
- **Audio:** your own voice. Mental-health AI demoed in an AI voice would undermine the brand. Record with the laptop mic or a headset.
- **No music.** This product is not a sneaker ad. Silence between voiceover lines is welcome.
- **No emoji on screen. No exclamation marks in captions.** Brand discipline applies to the video too.

## Pre-production checklist (do this before you press record)

Forty-five minutes of setup makes the recording itself thirty minutes instead of three hours.

- [ ] Use a fresh Chrome window in a clean profile (no extensions, no bookmark bar). `Cmd+Shift+N` for a fresh incognito works.
- [ ] Open https://mbwira-chi.vercel.app
- [ ] Dismiss the onboarding modal in advance — the video does not need to show it (you can describe it once in voiceover). Or include it deliberately if the storyboard says so.
- [ ] Verify the demo flow runs cleanly: type the first message, watch the response stream, type the crisis message, watch the card mount.
- [ ] Hide the macOS dock (System Settings → Desktop & Dock → "Automatically hide and show").
- [ ] Hide the menu bar clock and any notification chips (Settings → Control Center).
- [ ] Set browser zoom to 110% so the type is readable on a small Devpost video player.
- [ ] Close every other application. Turn on Do Not Disturb.
- [ ] Have a glass of water. You are about to read aloud.

## Recording tools (all free, all on macOS)

1. **Screen capture** — built-in. Press `Cmd+Shift+5`, choose *Record Selected Portion*, draw a tight rectangle around the browser window, click *Options* → set microphone to *MacBook Microphone* (or your headset), click *Record*. Stop with the stop button in the menu bar or `Cmd+Ctrl+Esc`.
2. **Voiceover** (optional, if you prefer to record screen and voice separately) — *QuickTime Player* → File → New Audio Recording. Record voiceover against a transcript, then sync in iMovie.
3. **Editing** — *iMovie* (built into macOS). Import the screen capture, drop in the voiceover, trim, add the title and end card.
4. **Export** — iMovie → File → Share → File → 1080p, High quality, mp4.

For polish if you have an extra hour: use **CapCut** for desktop (free) or **ScreenStudio** (paid, ~$90) — both auto-zoom on the cursor and look more professional. Not required.

---

## Shot list — 75 seconds

The table is the source of truth. Each row is one shot. The voiceover column is verbatim — write what you will say, then say exactly that, with the pacing the timing demands.

| Time | On screen | Voiceover (verbatim) | Notes |
|---|---|---|---|
| **0:00–0:05** | Black card. Bone text fades in: `Rwanda has 13 psychiatrists.` | — (silent five seconds) | Let the number land before any voice. Make the card in Keynote: bone background `#F7F4EE`, ink text `#1F1B16`, Fraunces serif. |
| **0:05–0:10** | Cut. Second card: `For 13 million people.` | "Rwanda has thirteen psychiatrists, for thirteen million people." | Read it slowly. One beat between the two clauses. |
| **0:10–0:18** | Third card: `27.4% of Rwandan youth live with a psychological disorder.` | "Twenty-seven percent of Rwandan youth live with a diagnosable psychological disorder. Almost none of them will see a clinician." | The second sentence is the punch. |
| **0:18–0:24** | Cut to mbwira-chi.vercel.app on a phone-width browser (375px). Empty state visible: *Speak to me.* | "This is Mbwira. A first door." | Camera holds for two beats so the room sees the typography and the clay accent dot. |
| **0:24–0:34** | Conversation view. You type: *I have not slept properly in three weeks. My mother survived 1994 and my father has never spoken about it.* | "A user types what they have not said out loud before. Mbwira listens in the way Rwandan resilience therapy listens — not the way an American chatbot listens." | Type at human speed. Do not edit out the typing. |
| **0:34–0:46** | The response streams in. Stop typing, let the cursor read. Mbwira's reply appears in Fraunces serif, chunk by chunk. | (silent — let the streaming response carry the audio) | This is the most important visual in the video. Do not narrate over it. The room watches the words appear. |
| **0:46–0:52** | The completed response is visible. Pull-quote the line *"this weight that lives in the house but has no name"* by highlighting it. | "It refuses to diagnose. It mirrors what it hears." | Six-second beat. |
| **0:52–1:00** | You type: *I have been thinking about ending things tonight.* Send. | "And when risk rises —" | Voice trails off. Wait for the card. |
| **1:00–1:08** | The crisis card mounts on top. *A PAUSE · What you just said matters.* RBC 114. Caritas Rwanda. | "— the room changes. A real human, on the screen, in one tap. The conversation pauses until the user is ready." | This is the climax. Slow your voice. |
| **1:08–1:13** | Cut to the ethics drawer (`?demo=ethics`). The five lines: *will not diagnose · will not pretend to be human · will not handle a crisis alone · will not remember without permission · will not replace what is missing.* | "Ethics is not a feature of this product. It is the perimeter." | Echo the deck. |
| **1:13–1:15** | Closing card. Bone background. `mbwira-chi.vercel.app` in Fraunces serif. Beneath, in smaller Inter: *Built by [your name] · CBC @ ALU Hackathon · May 2026* | "Mbwira. *Murakoze.*" | One word at the very end. The K in Murakoze is *koh-ZAY*. |

Total: **75 seconds**, with three to four seconds of breathing room. If you run short on slack, the easiest cut is to compress 0:34–0:46 to ten seconds by speeding the typing cadence — but never speed up the audio.

## Title and end cards

You will need three Keynote slides exported as images (or as a short mp4):

### Card 1 — `Rwanda has 13 psychiatrists.`

- Background: `#F7F4EE` (bone)
- Type: Fraunces serif, 120pt, `#1F1B16` (ink), centered
- Tiny eyebrow at top-left: `THE GAP` in Inter, 11pt, all-caps, letter-spacing +0.12em, in `#6B6357` (stone)
- Single clay dot (`#C8553D`, 12px) to the right of the period

### Card 2 — `For 13 million people.`

- Same layout
- The clay dot moves

### Card 3 — `27.4% of Rwandan youth live with a psychological disorder.`

- Same palette. Number set at 120pt, the rest of the sentence at 32pt beneath.

### End card

- `mbwira-chi.vercel.app` centered, Fraunces 56pt
- Beneath: `Built by [your name] · CBC @ ALU Hackathon · May 2026` in Inter, 14pt, stone
- One clay dot to the right of the URL

All four cards take fifteen minutes in Keynote. Export each as a 1920x1080 PNG, then drop into iMovie at the storyboard timings.

## Recording protocol (the actual half-hour)

1. **Take 1 — dry run.** No recording. Just walk through the flow with the script in front of you. Time yourself with a watch. Adjust phrasing where breath runs out.
2. **Take 2 — voice only.** Open QuickTime, record voice against the script. Re-record any line you stumble on. Save as `mbwira-voice.m4a`. Trim silence at start and end.
3. **Take 3 — screen only.** Open `Cmd+Shift+5`. Record the full demo flow at the pace of the script (you do not need to speak during the recording). Re-do takes until you get a clean run.
4. **Edit in iMovie:**
   - Drop in the three title cards (0:00 to 0:18).
   - Drop in the screen recording (0:18 to 1:13).
   - Drop in the end card (1:13 to 1:15).
   - Drop the voice track underneath. Slide it so each line lands on the right shot.
   - Add subtle fades between shots (Cross Dissolve, 0.3s) — not flashy transitions.
5. **Export:** File → Share → File → 1080p, High quality, mp4. Name it `mbwira-demo-v1.mp4`.

## Where to host

Three options, ranked.

1. **YouTube (unlisted)** — preferred. Devpost embeds it. Most judges and voters already have it open.
2. **Vimeo** — also embeds cleanly on Devpost. Slightly higher production-tier feel.
3. **Direct mp4 link from your own hosting** — fine, but adds friction.

Upload, set to *Unlisted* (not *Private* — judges need the link to work without sign-in), and paste the URL into Devpost's video field.

## Captions

Auto-caption the YouTube upload. Mbwira's audience includes deaf and hard-of-hearing viewers, and judges may be watching on mute on a train. YouTube auto-captions are usually 90% accurate; spend ten minutes correcting the helpline numbers (114, +250 788 386 700) and the words *Mbwira*, *Murakoze*, *guhahamuka*, *Interpeace*, *ROT*.

## What this video deliberately is not

- It is not a slide presentation. The pitch script is for the live room. The video shows the product.
- It is not a tutorial. There is no "click here, then click here" — just usage at the pace a real user would use it.
- It is not a hype reel. There are no fast cuts, no neon overlays, no whoosh sound effects.
- It is not a founder story. You appear once, in the end card, by name. The voice carries the project, not the person.

## One last test before you upload

Watch your final mp4 on your phone, with the sound off, then with the sound on. If both pass — meaning the visuals carry the meaning without voice, and the voice adds depth on top of clear visuals — it is ready. If only one of those passes, the other needs more work.
