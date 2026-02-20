# Development Workflow — Student Task Board

Purpose: a concise, repeatable process from a User Story to code merged to `main`. This workflow aligns with the project's coding standards and localStorage-first architecture.

## Roles

- **Author / Developer:** implements the story, writes tests, updates adapter when needed.
- **Reviewer:** verifies implementation, tests, accessibility, and storage safety.
- **Release Manager:** merges after CI passes and publishes the build.

## End-to-end Steps

1. Create / Refine User Story
	- Author or PO creates a story in `specs/stories/` with title, description, acceptance criteria, and success metrics.
	- Acceptance criteria must be testable (unit/integration or manual steps).

2. Triage & Plan
	- Estimate complexity and break into tasks if needed (UI, domain, persistence).
	- Identify if persistence/schema changes are required (this flags `LocalStorageAdapter` updates).

3. Branch & Setup
	- Create a feature branch: `feat/STORY-ID-short-description`.
	- Pull latest `main` and rebase frequently.

4. Implementation (React)
	- Add types in `src/models/` before implementing UI.
	- Implement business logic in `src/lib/` or `src/models/`.
	- Build presentational and container components under `src/components/` and `src/pages/` using PascalCase filenames.
	- Use hooks in `src/hooks/` for reusable logic (e.g., `useTaskStore`).
	- Follow naming, file structure, and accessibility guidelines from `memory-banks/conventions/coding-standards.md`.

5. Update localStorage helper (if required)
	- Update the adapter in [src/services/local-storage-adapter.ts](src/services/local-storage-adapter.ts) rather than calling `localStorage` directly.
	- Add/Update schema version in the stored meta object (e.g., `stb:meta:v1`).
	- Add a migration function in `src/services/migrations.ts` when changing schema.
	- Write unit tests for adapter behavior including:
	  - Normal read/write
	  - Corrupted payload handling
	  - QuotaExceededError handling (simulate by mocking `localStorage`)

6. Testing (Jest)
	- Write unit tests for models, services, hooks, and critical components.
	- Aim for >= 80% coverage on core business logic and persistence modules.
	- Run tests locally:

```bash
npm ci
npm run test       # runs jest in watch or single-run mode depending on script
npm run test:coverage
```

	- Fix failing tests and add targeted tests for edge cases (storage errors, migrations).

7. Lint, Format & Build
	- Run linter and formatter:

```bash
npm run lint
npm run format
npm run build
```

8. Open PR & Review
	- Push branch and open PR. Use small, focused PRs.
	- PR checklist should include: tests added, storage adapter used, migration notes (if any), accessibility checks, and performance notes for large lists.
	- Reviewer verifies code style, tests, and runs `npm run test` locally if needed.

9. Merge & Release
	- Merge after CI passes and approvals obtained.
	- Tag a release if it's a user-visible change.
	- Deploy static build to GitHub Pages or static host (see architecture notes).

## PR Checklist (template)

- Title: `feat|fix|chore(scope): short description`
- Description: link to story, short summary, acceptance criteria met.
- Tests: list added/updated tests and coverage result.
- Migration: mention any `localStorage` schema changes and migration strategy.
- Accessibility: keyboard/ARIA checks performed.
- Performance: notes if large lists were impacted and mitigation taken.

## Example: Updating the LocalStorage Adapter

- Create a migration in `src/services/migrations.ts` that maps `v0` → `v1`.
- Adapter must:
  - Use versioned keys (`stb:tasks:v1`).
  - Validate parsed payloads using a validator (e.g., `zod` or manual checks).
  - Catch `QuotaExceededError` on write and:
	 - Try clearing non-essential keys
	 - Persist to in-memory fallback and notify user
	 - Offer immediate JSON export through UI

## Quick Commands

- Start dev server: `npm run dev`
- Run tests: `npm run test`
- Coverage: `npm run test:coverage`
- Build: `npm run build`

## Notes & Best Practices

- Write tests for the persistence adapter first when changing storage behavior.
- Keep PRs small and include migration plan in the PR description for any schema change.
- Maintain the 80% coverage requirement for core modules; CI should fail the build when below threshold.

---

File: [memory-banks/workflows/development-process.md](memory-banks/workflows/development-process.md)

