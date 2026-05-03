# ADR-0005: Vitest replaces Jest as the frontend test runner

**Status:** Accepted
**Date:** 2026-05-02

## Context

Pre-rewrite, CTJ's frontend tests ran on Jest with `babel-jest` (for JSX transformation), `@testing-library/react`, and a `jest-react-test.yml` GitHub Actions workflow.

The rewrite moves to Next.js 16 with the App Router, server components, and a Vite-shaped tooling era (Next 16 bundles Turbopack; vite is the default underlying transformer for most modern React app scaffolds). Jest in this era requires a `babel-jest` config to transform ESM/JSX, which fights with the rest of the toolchain - Vite-shaped configs in `vite.config`, Vite-shaped imports in app code.

Vitest is the Vite-native test runner. It shares Vite's transformer, supports JSX out of the box, parses ESM natively, and runs tests in parallel via `worker_threads`. The Jest-API compatibility is high enough that most existing test files migrate by changing imports.

## Decision

**Replace Jest with Vitest as the frontend test runner. Migrate the existing tests; rename `jest-react-test.yml` to `vitest-test.yml`. Drop `jest`, `babel-jest`, and the Jest-related dev deps from `package.json`.**

The version pin (Vitest 3, deferring 4) is documented in [ADR-0001](0001-tooling-baseline.md) under "Frontend test runner."

Concrete shape:

- `vitest` 3.x in `package.json`.
- `vitest.config.mts` - `.mts` because `@vitejs/plugin-react` 5 is ESM-only and the config has to be a true ESM module.
- `@testing-library/react` retained (works with both); `@testing-library/jest-dom` matchers retained via Vitest's extend mechanism.
- `tests/` directory location preserved; co-location of `.test.tsx` next to `.tsx` is allowed but not enforced.
- `.github/workflows/vitest-test.yml` (renamed from `jest-react-test.yml`) runs `npx vitest run` on PRs.
- Existing test files migrated: `import { describe, expect, it } from "vitest"` instead of relying on Jest's globals. `vi.fn()` replaces `jest.fn()`; `vi.mock(...)` replaces `jest.mock(...)`.

## Alternatives considered

- **Stay on Jest.** Familiar, mature, large community. Discarded because Jest's transformer (`babel-jest` with the Next.js preset) drifts from Next's actual transformer (Turbopack/SWC); divergence between test-time and build-time transforms creates "passes in tests, fails in build" hazards. Jest's startup cost is also meaningfully higher than Vitest's parallel worker pool.

- **`@testing-library/react` + Playwright (E2E only, no unit-test runner).** Considered as a "tests are integration-only" posture. Discarded because the existing test suite has unit-shape tests (utility functions, context logic, form validation) that are cheaper to write and run as unit tests than as full Playwright runs.

- **node:test (Node's built-in test runner).** Zero-dep, runs natively. Discarded because it doesn't transform JSX/TSX out of the box; the React Testing Library + jest-dom matchers ecosystem assumes Jest-API-shaped expect; rebuilding that on node:test means writing custom matchers; tooling integration (IDE test running, watch mode) is less mature.

- **Bun's built-in test runner.** Discarded because the project runs on Node 24, not Bun; Bun's React-component-testing story is less developed than Vitest's.

## Consequences

**Accepted:**

- All existing test files needed an import-shape migration (added `import { describe, expect, it } from "vitest"` and replaced `jest.fn()` with `vi.fn()`). One-time cost paid in the port PR.

- The renamed workflow file (`vitest-test.yml`) is now the authoritative test job. Anyone with a fork or a stale clone referencing `jest-react-test.yml` has to update.

- Vitest 4 is deferred. The pin will be revisited when `@vitejs/plugin-react` no longer requires `babel-plugin-react-compiler` as a peer.

- A small number of tests are skipped at the modernization tip. They're independent of Vitest itself; they were skipped during the migration because the underlying assertions need rewriting against the new component shapes.

- Local vitest runs require Node 22+ (vitest 3 dropped Node 20 support). CI exercises tests on every PR regardless.

**Won:**

- Tests share the build's transformer; what passes in tests passes in build. The "passes in tests, fails in build" class of bugs is largely eliminated.

- Vitest's parallel runner cuts test wall time meaningfully.

- Watch mode is faster (Vite's HMR-like dependency graph means only affected tests re-run on change).

- Configuration is one file (`vitest.config.mts`) instead of `jest.config.js` + `babel.config.json` + `babel.config.js` + an `__mocks__/` tree.

- Vitest's built-in coverage reporter uses `v8` natively (no `nyc` instrumentation step), so coverage runs are also faster.
