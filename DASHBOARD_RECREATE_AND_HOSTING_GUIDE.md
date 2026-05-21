# Formula1 Paddock — Recreate, Use, Modify, and Host Guide

This guide explains how to rebuild this platform from source, run it locally, customize it, and deploy it.

---

## 1) What this platform includes

The dashboard is a React + TypeScript app built with Vite. It combines:

- Formula 1 data services for standings/telemetry context
- AI-generated paddock/news style content via Gemini
- Modular dashboard sections (hero, ticker, standings, calendar, intel, footer)

Main implementation areas:

- `src/App.tsx` → page composition and refresh loop
- `src/components/*` → visual dashboard blocks
- `src/services/*` → F1 and AI service layer
- `src/constants.ts` and `src/types.ts` → shared data and typing

---

## 2) Prerequisites

Install the following on your machine:

- **Node.js** (18 or newer recommended)
- **npm** (9 or newer)
- A **Gemini API key**

Then confirm tools:

```bash
node -v
npm -v
```

---

## 3) Recreate the dashboard locally

### Step 1: Clone repository

```bash
git clone https://github.com/pangerlkr/Formula1-Paddock.git
cd Formula1-Paddock
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create your local env file from the sample:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

### Step 4: Start development server

```bash
npm run dev
```

The app runs on:

- Host: `0.0.0.0`
- Port: `3000`

Open your browser to `http://localhost:3000`.

---

## 4) How to use the dashboard

After launching the app:

1. Use the dashboard sections to view race context, standings, and schedule data.
2. Let the app auto-refresh live sync data (the app periodically triggers sync).
3. Use theme toggle and comparison-style sections for different views.
4. Review AI-driven paddock/news outputs (requires valid Gemini key).

If Gemini key is not set, AI-specific outputs may be empty or fallback-based.

---

## 5) How to edit or modify the platform

### A) Update UI components

- Edit files in `src/components/`
- Keep component props consistent with existing types
- If adding new sections, register them in `src/App.tsx`

### B) Change data behavior

- F1 sync and telemetry logic: `src/services/f1Service.ts`
- Race schedule retrieval/fallback: `src/services/raceScheduleService.ts`
- Gemini prompt/schema logic: `src/services/geminiService.ts`

### C) Update static constants or models

- Shared constants: `src/constants.ts`
- Shared types: `src/types.ts`

### D) Validate your changes

Run checks after edits:

```bash
npm run lint
npm run build
```

Use `npm run preview` to inspect production output locally.

---

## 6) Build for production

Generate production assets:

```bash
npm run build
```

This outputs a deployable static bundle in `dist/`.

Optional local production preview:

```bash
npm run preview
```

---

## 7) Hosting options

Because this is a Vite static frontend, deploy the `dist/` output to any static hosting provider.

### Option A: Vercel

1. Import repository into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add environment variable in project settings:
   - `GEMINI_API_KEY=...`
6. Deploy.

### Option B: Netlify

1. Connect repository to Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Add environment variable:
   - `GEMINI_API_KEY=...`
5. Deploy site.

### Option C: GitHub Pages (static)

1. Build locally (`npm run build`) or with GitHub Actions.
2. Publish contents of `dist/` to your Pages branch/folder.
3. Ensure your base path configuration is correct if serving under a subpath.

### Option D: Any static server / CDN

Upload `dist/` assets to S3 + CloudFront, Firebase Hosting, Cloudflare Pages, or equivalent static host.

---

## 8) Environment and security notes

- Never commit real API keys to the repository.
- Keep keys in platform environment settings (`.env.local` for local only).
- If rotating a compromised key, update host env settings and redeploy.

---

## 9) Recommended workflow for contributors

1. Create a branch.
2. Make focused changes.
3. Run:
   - `npm run lint`
   - `npm run build`
4. Open a PR with a clear summary.

---

## 10) Troubleshooting

### Build fails with missing dependencies

Run:

```bash
npm install
```

### AI content does not appear

- Verify `GEMINI_API_KEY` exists in `.env.local`
- Restart dev server after changing env vars

### Data sections look empty temporarily

Live APIs can be intermittent; schedule/fallback logic should recover when upstream data is unavailable.

---

If you fork this project to create your own motorsport dashboard, start by customizing `src/constants.ts`, then update the relevant service prompts and component branding.
