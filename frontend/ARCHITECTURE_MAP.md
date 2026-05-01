# Frontend Architecture Map

## Purpose

Defines how to trace behavior from URL to feature code, and how to compose new frontend work without collapsing routing, state, API access, and rendering into single files. The aim is a stable mental model: a route file tells you *where in the app* you are; a feature directory tells you *what the app does there*.

## Layer Rules

1. `src/app/**/page.tsx` route files are thin composition and navigation layers.
2. `src/app/**/layout.tsx` files frame nested route trees - they own chrome (nav, footer, page-level providers) but not feature behavior.
3. `src/features/<feature>/components/*` contain feature UI and local interaction behavior.
4. `src/features/<feature>/api.ts` contains feature endpoint calls only (one file per feature, server-action or fetch wrappers).
5. `src/features/<feature>/types.ts` contains transport and feature data shapes.
6. `src/shared/*` contains cross-feature primitives - design-system components, utilities, hooks. Anything in `shared/` should be referenced by at least two features; if only one feature uses it, it belongs in that feature's directory.

## Route Shim Policy

1. Route files under `src/app/**/page.tsx` are URL shims only.
2. Allowed in route files: route-level metadata, static framing copy, and feature entry mounting.
3. Disallowed in route files: domain mutations, endpoint orchestration, validation logic, and cross-feature business state.
4. If route logic starts to branch by workflow conditions, move that logic into a feature controller and have the route mount the controller.

## Controller API Policy

1. Feature parent components (`*Console`) call one `use<Feature>Controller` hook.
2. Parent controllers return one explicit typed API object (for example `QualifierControllerApi`).
3. Domain behavior splits into focused hook/helper modules (validation, navigation, persistence) that the parent controller composes.
4. Child components receive props from the parent API object and stay render/event focused.

The `Console` + `use<Feature>Controller` pair is a convention, not a framework requirement. Trivial features (a static credits page, a privacy policy) do not need a controller - the route file can render the feature components directly.

## Function Style Convention

1. Top-level exported hooks/helpers/components prefer `function` declarations.
2. Local callbacks and closures inside hooks/components prefer `const ... = (...) =>`.
3. Do not mix styles arbitrarily inside the same scope; choose the style that matches visibility and ownership.

## Route To Entry Map

| Route | Route File | Primary Entry |
| --- | --- | --- |
| `/` | `src/app/(with-nav)/page.tsx` | `src/features/landing/components/landing-page.tsx` |
| `/credits` | `src/app/(with-nav)/credits/page.tsx` | `src/features/credits/components/credits-page.tsx` |
| `/privacy-policy` | `src/app/(with-nav)/privacy-policy/page.tsx` | inline static content |
| `/qualifier/[page]` | `src/app/(with-nav)/qualifier/[page]/page.tsx` | `src/features/qualifier/components/qualifier-console.tsx` |
| `/login` | `src/app/(auth)/login/page.tsx` | `src/features/session/components/login-console.tsx` |
| `/signup` | `src/app/(auth)/signup/page.tsx` | `src/features/session/components/signup-console.tsx` |
| 404 | `src/app/not-found.tsx` | inline static content |

`(with-nav)` and `(auth)` are Next.js route groups - they namespace nested layouts without adding URL segments. `(with-nav)` wraps pages that get the default header/footer; `(auth)` wraps login/signup which omit the nav chrome.

## Feature Map Coverage

Each `src/features/<feature>/FEATURE_MAP.md` documents that feature's component graph, controller API, and any non-obvious flows. Add one when the feature has more than two components or any non-trivial state.

1. `src/features/landing/FEATURE_MAP.md`
2. `src/features/credits/FEATURE_MAP.md`
3. `src/features/qualifier/FEATURE_MAP.md`
4. `src/features/session/FEATURE_MAP.md`
