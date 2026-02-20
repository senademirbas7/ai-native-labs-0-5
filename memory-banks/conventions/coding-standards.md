# Memory Banks — Coding Standards

This document codifies conventions and best practices for the Memory Banks project (Student Task Board). It's written to be machine- and human-consumable and covers naming, file layout, testing targets, and storage error handling.

## Purpose & Scope

- Scope: frontend SPA built with React 18 + Vite + TypeScript. Applies to all files under `src/` and to CI/test infra.
- Goal: consistent, readable, testable code that is safe for localStorage-based persistence and easy to extend.

## High-level Principles

- Keep components small and focused (single responsibility).
- Favor explicit types; prefer `interface` for public props/types.
- Write unit tests for business logic and persistence adapters before UI wiring where practical.
- Treat `localStorage` as a persistence adapter with clear error handling and versioned keys.

## Naming Conventions

- Components: PascalCase (e.g., `TaskList`, `TaskEditor`). Component filenames use PascalCase with extension: `TaskList.tsx`.
- Files: kebab-case for non-component files and assets (e.g., `task-model.ts`, `local-storage-adapter.ts`, `task-list.module.css`).
- Hooks: `use` prefix + camelCase, PascalCase for the hook file if the export is a component, otherwise kebab-case file name: `useTaskStore.ts` export `useTaskStore()`.
- Variables & functions: camelCase (e.g., `saveTask`, `loadTasks`).
- Types & Interfaces: PascalCase and suffix when helpful (`Task`, `TaskDTO`, `TaskRepository`).
- Enums & Constants: PascalCase for enums (`TaskStatus`) and UPPER_SNAKE_CASE for module-level constants (`LOCALSTORAGE_KEY_STB_V1`).
- Tests: mirror source file with `.spec.ts` / `.spec.tsx` (e.g., `task-model.spec.ts`).

## File & Folder Structure (recommended)

Suggested `src/` layout:

- `src/components/` — presentational components (PascalCase files)
- `src/pages/` — top-level page views (routing targets)
- `src/hooks/` — custom React hooks (`use-*`)
- `src/models/` — domain models and types (`task-model.ts`)
- `src/services/` — persistence adapters and side-effect code (`local-storage-adapter.ts`)
- `src/lib/` — pure utilities, selectors, formatters
- `src/styles/` — global tokens, CSS modules
- `src/tests/` — test utilities and fixtures
- `src/routes.tsx` or `src/app.tsx` — application entry and routing

File naming examples:

- Component: `src/components/TaskList/TaskList.tsx` + `TaskList.module.css`
- Hook: `src/hooks/use-task-store.ts`
- Persistence adapter: `src/services/local-storage-adapter.ts`
- Types: `src/models/task-model.ts`

Keep public exports in `index.ts` files where appropriate to create stable import surfaces.

## Component & Code Guidelines

- Components: functional components with typed props. Keep components under ~100 lines where possible.
- Prefer composition over prop drilling; use Context for app-level state only.
- Use `useReducer` for complex state transitions; keep reducers pure and unit-testable.
- Avoid side effects during render. Side effects belong in `useEffect` or services.
- Styling: prefer CSS modules (`*.module.css`) or a scoped CSS-in-JS solution. File names remain kebab-case.

## State & Persistence

- Local app state first; persist authoritative task store through a single persistence adapter.
- Namespace keys with a version: e.g., `stb:tasks:v1`, `stb:prefs:v1`.
- Implement a single `LocalStorageAdapter` exported from `src/services/local-storage-adapter.ts` with methods: `get<T>(key): T | null`, `set<T>(key, value): void`, `remove(key): void`, `export(): string`, `import(json: string): void`.
- Always validate parsed JSON against expected shape before returning to domain code.

## localStorage Error Handling (required)

All reads/writes to `localStorage` must go through the adapter and follow this pattern:

- Wrap operations in `try/catch` and handle `DOMException`/`QuotaExceededError` and JSON parse errors.
- On read:
	- If key missing → return `null`.
	- If parse fails → log a warning, attempt to restore from backup or return `null` and surface a UI message recommending import/backup.
- On write:
	- Attempt `localStorage.setItem` in `try` block.
	- If `QuotaExceededError` occurs, catch and attempt to `remove` low-priority items, notify user, and offer export of current data.
	- Always maintain an in-memory fallback cache so the UI remains functional until the user resolves storage issues.
- Schema versioning & migrations:
	- Store a `meta` object with schema version alongside data (e.g., `stb:meta:v1`).
	- Provide migration helpers that transform older versions to current.
- User-facing recovery:
	- Provide `Export JSON` and `Import JSON` UX.
	- Provide `Clear Data` action with confirmation and suggested backup.

Example adapter error snippet (conceptual):

```ts
try {
	localStorage.setItem(key, JSON.stringify(payload));
} catch (err) {
	if (isQuotaError(err)) {
		// fall back: remove cache, notify user, save to in-memory store
	} else {
		// log and rethrow or surface friendly error
	}
}
```

## Testing

- Goal: minimum 80% unit test coverage for core business logic and persistence adapters.
- Test targets:
	- `src/models/*` — validation, selectors, derived data
	- `src/services/*` — `LocalStorageAdapter` behavior for normal reads/writes, corrupted payloads, quota errors
	- `src/hooks/*` — state transitions and side effects (use `@testing-library/react-hooks` or render components with `@testing-library/react`)
	- Critical components with UI logic (filters, task creation flows)
- Test naming: `file.spec.ts` or `file.spec.tsx` next to source files.
- CI: run tests and fail build if coverage < 80% for the measured targets. Use `vitest` or `jest` + `coverage` config.

## Linting & Formatting

- Use ESLint with TypeScript plugin and Prettier for formatting.
- Recommended ESLint rules (high level):
	- Enforce TypeScript strictness where feasible (`strict: true`).
	- No implicit `any`.
	- Prefer `readonly` for data that should not change.

## Error Reporting & Logging

- No telemetry or external analytics for MVP (privacy-first). Use a lightweight `logger` abstraction that can be replaced later.
- In development, allow `console.debug`/`console.warn` to help debugging; in production, limit to critical errors.

## PRs, Commits, and Code Review

- Commit messages: follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Small PRs focused on one change/feature. Include changelog/release notes for user-visible behavior.
- Each PR must include unit tests for new business logic.

## Accessibility & Performance

- Aim for WCAG 2.1 AA. Use semantic HTML and ARIA where needed.
- Optimize renders for lists: consider virtualization for large task lists.

## Extensibility / Migration Notes

- Abstract persistence behind an interface so the adapter can be swapped for a backend later without changing domain/UI code.
- Keep schema migrations in `src/services/migrations.ts` and run them on app startup via the adapter.

## Quick Checklist (pre-merge)

- [ ] Types for new modules are present
- [ ] Unit tests added (coverage maintained)
- [ ] `localStorage` adapter used instead of direct `localStorage` calls
- [ ] Error handling for storage operations implemented
- [ ] Lint passes and formatting applied

---

Document last updated: 2026-02-18

