# Frontend Docstring Style

CTJ frontend code follows a JSDoc convention. The shape inverts the backend's: **heavy on the module level, light at the per-export level**. Backend's substantive policy lived on classes; on the frontend, the file itself is usually the unit of design (a component, a context, a utility cluster), so the file-header is where context goes.

This guide covers what to put in JSDoc comments for each kind of frontend file. The backend has its own conventions; see [backend-docstring-style.md](./backend-docstring-style.md).

## Common rules

| Rule | Convention |
|------|-----------|
| Format | JSDoc (`/** ... */`) — single-line or block, never `//` |
| Code references | Backticks (`` `joinClassNames` ``) |
| Line length | Match Prettier's default (printWidth 80) |
| Per-prop documentation | Use TypeScript types; don't redocument props in JSDoc |
| Bullet style | `-` (dashes) when needed, but prefer prose paragraphs |
| Bug flags | Prose paragraph in the relevant docstring, marked clearly so future readers see it (no special syntax required) |

Frontend JSDoc is **prose-style**, not labeled-section style. Reasons:
- Components and utilities have a single purpose; there's nothing to label.
- React conventions favor prose JSDoc (TypeScript handles the structured part: prop types).

## Module headers — heavy

Every TS / TSX file gets a module header at the top: a JSDoc block with a 1-2 sentence summary plus 1-3 short paragraphs of context. The header explains:

- What the file is responsible for.
- What it exports (in user-facing terms, not just function names).
- Non-obvious design decisions, edge cases, or constraints.

```typescript
/**
 * Reactive hook that subscribes to the session in localStorage.
 *
 * Uses `useSyncExternalStore` to listen for both same-tab custom
 * events (SESSION_CHANGE_EVENT from save/clear) and cross-tab
 * `storage` events, so the UI stays in sync regardless of where
 * the session changes.
 */
```

Module headers are heavy because the file is the unit of design on the frontend. A reader skimming the file should be able to read the header and know whether they're in the right place without scrolling.

## Per-export — light

Per-export JSDoc is one-liner by default. Add multi-line prose only when the export has non-obvious behavior, edge cases, or a constraint that isn't visible from the type signature.

```typescript
/** Merge class-name fragments, filtering out falsy values. */
export function joinClassNames(...) { ... }


/** Default API base URL, sourced from environment or falling back to localhost. */
export const defaultApiBaseUrl = ...;


/**
 * Server-side API base URL for SSR fetches (e.g., health checks
 * in server components). In Docker, the frontend container can't
 * reach the backend via localhost — it needs the Docker service
 * name. Falls back to the public URL for host-mode dev.
 */
export const serverApiBaseUrl = ...;
```

Don't redocument what the type signature already says. JSDoc for `function joinClassNames(...parts: Array<string | false | null | undefined>)` doesn't need to say "takes an array of strings or falsy values" — that's already in the type.

## Per-kind templates

The frontend has eight categories of files; each has a tuned shape for the module header. Per-export JSDoc is consistent across all of them (one-liner; multi-line for non-obvious).

### App routes (`src/app/...`)

Next.js page and layout files. Often thin (5-15 lines). Module header should call out the route path, what it renders, and the layout group context (`(with-nav)` vs `(auth)`).

```typescript
/**
 * Login page route at `/login`.
 *
 * Renders inside the `(auth)` route group's layout, which provides
 * the side-illustration panel and AuthNav header. The form
 * component itself owns the right column.
 */
```

For layout files (`layout.tsx`), describe the layout group's purpose and what shared chrome it provides (header, footer, side panel, etc.).

### Feature components (`src/features/<feature>/...`)

Components that own a chunk of user-facing behavior. Module header describes the feature, where it sits in the user flow, and any cross-cutting concerns (state from context, integrations with shared UI primitives).

```typescript
/**
 * Signup form component for new-user registration.
 *
 * Wires `react-hook-form` validation to the backend signup
 * endpoint. On success, redirects to `/`. On 400, surfaces the
 * first DRF field-validation message inline; on 500 / network
 * errors, falls back to a generic copy.
 *
 * Used by the `/signup` page in the `(auth)` route group.
 */
```

### Shared UI components (`src/shared/components/...`)

Reusable primitives. Module header should describe the primitive, when to reach for it vs alternatives, and any non-obvious behavior (composition with other primitives, accessibility decisions, etc.).

```typescript
/**
 * Generic text input field tied to `react-hook-form`.
 *
 * Generic over the form's `Inputs` shape so the field name (`id`
 * prop) is type-checked against the form schema at the call site.
 * Wraps a native `<input>` with a label, error message, and
 * `aria-invalid` wiring. For controlled non-form inputs, use
 * `<input>` directly or build a non-RHF wrapper.
 */
```

For components with non-obvious props, add per-export JSDoc on the component function too:

```typescript
/**
 * Render a labeled input.
 *
 * `validations` is forwarded to RHF's `register()`; the rules object
 * shape is documented in the RHF docs. `errors` should be the
 * relevant slice of the form's `errors` object (e.g.
 * `errors.email`), not the whole error map.
 */
export default function TextField<TInputs>({ ... }: Props<TInputs>) { ... }
```

### Shared utilities (`src/shared/lib/...`)

Pure functions, helpers, type predicates. Module header lists what utilities live in the file and any cross-cutting context (e.g. why these utilities exist locally vs from a library). Per-function: one-liner.

```typescript
/**
 * Small utility cluster used across components.
 *
 * `cn` is a clsx passthrough; it exists as a separate name so
 * components can swap it out later (e.g. for `tailwind-merge`)
 * without touching call sites. `onKey` is a keyboard event filter
 * for `onKeyDown`/`onKeyUp` handlers. `range` is a numeric range
 * generator for pagination/grid layouts.
 */
```

### Shared contexts

React contexts that hold cross-tree state. Module header should describe the state shape, lifecycle (when does it mount, when does it update), and the mount point (root layout, feature subtree, etc.).

```typescript
/**
 * Qualifier flow context for the multi-step skill survey.
 *
 * Holds the user's draft answers across the qualifier route group
 * (`/qualifier/1` through `/qualifier/N`). The state is in-memory
 * only; navigation between steps preserves answers, but a hard
 * page reload clears them. Mounted from the qualifier layout, not
 * the root layout, because answers are scoped to that flow.
 */
```

### Static data (`src/shared/data/...`)

Data files (constant arrays, lookup tables). Module header describes what the data is, why it's stored locally, and when it should be updated.

```typescript
/**
 * Static reference data for Communities of Practice.
 *
 * Mirrors the backend's `CommunityOfPractice.PracticeAreas` enum.
 * Update both this file and the backend `PracticeAreas` choices
 * together when the taxonomy changes; out-of-sync values cause
 * silent rendering of unknown CoP values as raw strings.
 */
```

### Type declarations (`src/types/*.d.ts`)

One-liner module header.

```typescript
/** Ambient declarations for SVG module imports (handled by SVGR). */
```

### Tests (`frontend/tests/...`)

Module header is light (one-liner). Test names and per-test JSDoc follow the backend test convention: behavioral statement of what's verified, not a label for the test.

```typescript
/** Component tests for SignupForm.tsx. */

describe("SignupForm", () => {
  /** Submit with valid input triggers signup() and redirects to `/`. */
  it("happy path", () => { ... });

  /** 400 from the backend renders the first field-validation message inline. */
  it("400 surfaces error", () => { ... });
});
```

## Flagging bugs in JSDoc

Same convention as backend: prose paragraph in the relevant module or per-export JSDoc, clearly identifiable (e.g. "Note:", "Flagging as a bug"). The flag stays until the bug is fixed.

If the bug fix is significant enough to need a separate PR, the flag stays in JSDoc until that PR merges. Don't reference local-only files (anything in `scratch/` doesn't ship to upstream readers).

## When the conventions don't fit

Some examples that won't cleanly fit:

- A component file that's literally one line (`export { default } from "./Component"`): no JSDoc needed.
- A test file that's a stub for a not-yet-implemented feature: a one-liner explaining what's intended is enough.
- An auto-generated file (SVGR output, Next types): no JSDoc; the generation tool owns the file.

When in doubt: match the spirit (heavy module headers, light per-export, prose-style) over the letter of the templates.

## Tooling

- ESLint and Prettier don't validate JSDoc shape; convention is enforced by review.
- TypeScript handles the type-level documentation (prop types, return types); JSDoc is for the prose layer that types can't express.

If we want JSDoc lint enforcement later, `eslint-plugin-jsdoc` is the standard tool — but that's a separate workstream, not on the current roadmap.
