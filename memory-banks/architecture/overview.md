(# Architecture Overview — Memory Banks)

This document summarizes the architecture for the Memory Banks feature for the Student Task Board (STB). It's written for an AI assistant or engineer to quickly understand system shape, chosen pattern, key technologies, and deployment approach.

## System Architecture

- **Pattern:** Monolith (single-page application delivering all UI + client-side logic in one deployable artifact).
- **Runtime:** Browser-based React 18 single-page application (SPA) built with Vite.
- **Frontend:** React 18 functional components and hooks; UI is an SPA that implements all product features client-side.
- **State & Data Flow:** Local component state + React Context (or lightweight state hooks). Persistence to browser `localStorage` for all CRUD and settings operations (no server-side state for MVP).
- **Primary Components:**
	- **UI Layer:** Presentational components (task list, task editor, filters, dashboard).
	- **Domain Layer:** Task models, validation, derived selectors (filters, sorting, statistics).
	- **Persistence Layer:** Adapter that serializes/deserializes domain models to/from `localStorage` and exposes simple CRUD APIs to the domain layer.
	- **Routing/Navigation:** Client-side routing for views (optional: `react-router` for multiple pages/views).
- **Boundaries & Constraints:** No backend for MVP; localStorage limits apply (typical 5–10MB per origin). Keep data model compact and provide export/import JSON for backup.

## Tech Stack

- **UI Framework:** React 18
- **Build / Dev Tooling:** Vite (fast dev server, production build)
- **Language:** TypeScript for typesafety (recommended)
- **Persistence:** Browser `localStorage` (offline-first, privacy-first)
- **Optional / Recommended Dev Tools:** ESLint, Prettier, Vitest (unit tests), and optionally `gh-pages` or GitHub Actions for deployment automation.

## Deployment

- **Strategy (MVP):** Build a single static site with Vite and publish the `dist` output to GitHub Pages or any static host.
- **Vite build:** produce `dist/` using `npm run build` (or `yarn build`). Ensure `base` in `vite.config.ts` or `package.json` `homepage` is set if deploying to a subpath.

Example commands (local):

```bash
# install deps
npm install

# build production artifact
npm run build

# deploy with gh-pages (one option)
npm install --save-dev gh-pages
npx gh-pages --dist dist --branch gh-pages
```

- **Recommended Automation:** Use a GitHub Actions workflow that runs `npm ci && npm run build` and pushes `dist/` to the `gh-pages` branch or uploads to GitHub Pages via `peaceiris/actions-gh-pages` for repeatable CI/CD.

## Notes for AI/Engineer

- The PRD mandates offline-first local persistence and a minimal, privacy-first footprint—design tradeoffs should avoid server-side dependencies for MVP.
- Favor small, well-tested components and keep the data schema compact (task objects should avoid heavy nested structures to limit localStorage usage).
- Provide an export/import JSON utility and a clear 'Clear data' action to mitigate localStorage quota/loss risks.
- For future scale or multi-device sync, extract a persistence adapter interface so a backend or cloud-sync implementation can be added without changing higher-level UI/business logic.

## Quick References

- PRD: `specs/prds/student-task-board-prd.md` — core requirements, constraints, success metrics
- File updated: [memory-banks/architecture/overview.md](memory-banks/architecture/overview.md)

