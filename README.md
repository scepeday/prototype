# Pursuit OCR Prototype

Pursuit OCR Prototype is a frontend-only MID-fidelity mobile web app that reframes the Pursuit OCR experience as a gamified challenge companion. It guides a player through sign up, instructions, waiver acceptance, avatar creation, and a set of post-onboarding screens including missions, scanning, rooms, rewards, leaderboards, and profile.

## What this is

- React + TypeScript + Vite mobile-first prototype
- Static app using `HashRouter` for GitHub Pages compatibility
- Local mock data plus `localStorage` persistence
- Built for user testing and demo flows, not production release

## What is mocked

- Sign-up and onboarding persistence
- Waiver acceptance state
- Avatar configuration
- Mission data
- Room creation and room membership
- Scan history and XP updates
- Rewards and leaderboard data
- Recent activity feed

There is no backend, no real authentication, no QR camera integration, no booking flow, and no payment or legal submission storage.

## Run locally

```bash
npm install
npm run dev
```

The Vite dev server will print the local URL in the terminal.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy to GitHub Pages

This app uses `HashRouter`, so client-side routes remain compatible with static hosting.

### Option 1: package script

```bash
npm run deploy
```

This uses the `gh-pages` package to publish the `dist/` directory.

### Option 2: manual Pages publishing

1. Run `npm run build`
2. Publish the generated `dist/` folder with GitHub Pages or a GitHub Actions workflow
3. Keep the app on hash-based routes such as `/#/dashboard`

## Project notes

- State is stored in the browser with `localStorage`
- Prototype reset is available from the profile screen
- The visual direction is Pursuit-inspired without copying brand assets
