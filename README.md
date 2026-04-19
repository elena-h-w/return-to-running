# Back on Track

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A return-to-running tracker combining a PT strength routine with a structured walk/jog progression program. Mobile-friendly web app designed for one-handed iPhone use mid-workout.

**[→ Live demo](https://return-to-running.vercel.app)**

---

## What it does

Back on Track guides you through a structured return-to-running program alongside a PT-prescribed strength routine. It tells you exactly what to do each day, tracks your progress, and gates advancement based on a pain protocol — so you don't progress too fast.

**Strength program** (3×/week) — 11 exercises per session covering core stabilization, hip strengthening, and upper back. Step-by-step instructions and a rest timer built in.

**Run program** (3×/week) — three phases:
1. Walking base (treadmill pace, user-paced)
2. Walk/jog intervals (5 stages, 30 min each)
3. Timed running schedule (12 weeks, every-other-day build-up)

Before logging any run, you rate any pain using a four-type scale (Types 1–4). Types 3 and 4 block advancement and show a warning to consult a provider.

---

## Features

- **Today view** — shows exactly what to do today; guided workout mode for strength (one exercise at a time with set counter and rest timer)
- **Pain check** — structured pain rating (Types 1–4) before every run log, with automatic advancement blocks for serious pain
- **Advancement gate** — 2 consecutive pain-free sessions required before moving to the next run stage
- **Phase tracker** — visual progress indicator across all three run phases
- **Session log** — full history of every session with pain ratings
- **PWA** — installable on iPhone home screen, works offline

---

## Use this yourself

This app is built to be forked and adapted. All program content lives in one file — you don't need to touch any other code.

**1. Fork and clone**
```bash
git clone https://github.com/elena-h-w/return-to-running.git
cd return-to-running
npm install
```

**2. Edit the program data**

Open [`src/data/program.js`](src/data/program.js) and modify:
- `STRENGTH_EXERCISES` — swap in your own exercises, sets, reps, and instructions
- `RUN_PHASES` — adjust the walk/jog stages or the 12-week running schedule
- `DEFAULT_WEEK_PATTERN` — change the default strength/run/rest day layout

**3. Run locally**
```bash
npm run dev
```

**4. Deploy**
```bash
npm install -g vercel
vercel --prod
```

Or connect the repo to Vercel via the dashboard — zero config required.

---

## Configuration (first launch)

On first launch, a setup screen lets you:
- Set your run program start date
- Customize which days of the week are strength, run, or rest

All user data (progress, log, settings) is stored in `localStorage` only — nothing is baked into the codebase, so the app works for anyone who opens it.

**To reset:** Log tab → scroll to bottom → **Reset all progress**.

---

## Tech Stack

- React + Vite
- CSS Modules
- localStorage only — no backend, no auth
- PWA via vite-plugin-pwa

---

## License

[MIT](LICENSE) — free to use, modify, and share.
