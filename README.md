# Back on Track

A mobile-first return-to-running tracker combining a PT strength routine with a structured walk/jog progression program. Designed for one-handed iPhone use mid-workout.

## Features

- **Today view** — guided workout mode for strength days; run logging with interval display on run days
- **Strength program** — 11 exercises per session with sets/reps, step-by-step instructions, and rest timers
- **Run progression** — three-phase protocol: walking base → walk/jog intervals → timed running schedule
- **Pain check** — before logging a run, categorize any discomfort (Types I–IV) with automatic warnings for serious pain
- **Advancement gate** — must complete 2 consecutive pain-free sessions before advancing a run stage
- **Session log** — scrollable history of all sessions with pain ratings
- **PWA** — installable on mobile, works offline

## Stack

- React + Vite
- CSS Modules
- localStorage (no backend, no auth, no personal data in code)
- PWA via vite-plugin-pwa

## Getting started

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect the repo to Vercel via the dashboard — zero config required.

## Configuration

### Run start date

On first launch, a setup screen lets you pick your run program start date and customize which days are strength, run, or rest.

To change it after setup: open the **Log** tab → **Reset all progress**, then reconfigure on next launch.

All user data (progress, log, settings) is stored in `localStorage` only. Nothing is baked into the codebase.

### Weekly schedule

Default pattern: Mon Strength / Tue Run / Wed Strength / Thu Run / Fri Strength / Sat Run / Sun Rest.

Customize during setup — tap each day to cycle between Strength, Run, and Rest.

## Resetting progress

Log tab → scroll to bottom → **Reset all progress**. This clears all localStorage data.

## Program data

All exercise and run program data lives in [`src/data/program.js`](src/data/program.js). Edit that file to adjust exercises, sets/reps, or the run schedule.
