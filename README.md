<div align="center">

# 🏎️ Formula1 Paddock

**A real-time Formula 1 dashboard with live race context, standings, and AI-assisted paddock insights.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-paddock.pangerlkr.link-red?style=for-the-badge&logo=formula1)](https://paddock.pangerlkr.link)
[![TypeScript](https://img.shields.io/badge/TypeScript-98%25-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)

</div>

---

## 📖 Overview

**Formula1 Paddock** is a Vite + React + TypeScript dashboard focused on Formula 1 storytelling and race intelligence. It combines:

- live/simulated F1 feed syncing,
- season race context and standings views,
- and Gemini-powered summaries/intel blocks.

The UI is optimized for both desktop and mobile and designed as a modular dashboard you can easily customize.

🔗 **Live App:** [https://paddock.pangerlkr.link](https://paddock.pangerlkr.link)

---

## ✨ Core Features

- 🏁 **Live Sync Layer** for race/standings signals
- 👤 **Driver + Team insights** with profile-oriented cards
- ⚡ **Comparison and analytics widgets** across the dashboard
- 🤖 **Gemini AI integration** for paddock intel and narrative summaries
- 📅 **Season race schedule context** with fallback logic
- 📱 **Responsive dashboard layout**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + TypeScript | Dashboard UI and app logic |
| Vite | Dev server and production bundling |
| Tailwind CSS | Styling system |
| OpenF1 / Ergast-compatible data | Race/session context |
| Gemini API (`@google/genai`) | AI-generated intel |

---

## 🚀 Quick Start

### 1) Prerequisites

- Node.js 18+
- npm 9+
- Gemini API key

### 2) Clone and install

```bash
git clone https://github.com/pangerlkr/Formula1-Paddock.git
cd Formula1-Paddock
npm install
```

### 3) Configure environment

Create a local environment file:

```bash
cp .env.example .env.local
```

Set your key in `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
```

### 4) Run locally

```bash
npm run dev
```

By default, Vite serves on port `3000` and host `0.0.0.0`.

---

## ✅ Project Commands

```bash
npm run dev    # Start local dev server
npm run lint   # TypeScript check
npm run build  # Production build
npm run preview # Preview built app
```

---

## 📘 Full Build/Edit/Hosting Instructions

For complete step-by-step instructions to recreate this dashboard, use it, modify it, and deploy it:

➡️ **[DASHBOARD_RECREATE_AND_HOSTING_GUIDE.md](./DASHBOARD_RECREATE_AND_HOSTING_GUIDE.md)**

---

## 📄 License

This project is open-source. Feel free to fork, contribute, and build on top of it.
