# Frontend Lint Guide

The frontend lint suite covers four layers: ESLint for TS/TSX, Stylelint for CSS Modules, Knip for dead code, and Prettier for formatting. Each runs both locally (via [pre-commit](devops.md#linting)) and in CI ([`.github/workflows/lint.yml`](https://github.com/hackforla/CivicTechJobs/blob/main/.github/workflows/lint.yml)).

| Layer | Tool | Config |
|-------|------|--------|
| TS / TSX linting | ESLint 9 (flat config) | [frontend/eslint.config.mjs](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/eslint.config.mjs) |
| CSS Modules linting | Stylelint | [frontend/stylelint.config.mjs](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/stylelint.config.mjs) |
| Dead code / unused exports | Knip | [frontend/knip.json](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/knip.json) |
| Formatting | Prettier | inline (no separate config file; defaults plus `--ignore-path .gitignore`) |
| Type checking | `tsc --noEmit` | [frontend/tsconfig.json](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/tsconfig.json) |

## ESLint

ESLint 9's flat config replaces the legacy `.eslintrc` cascade with explicit imports and a single config array; less magic resolution, easier to reason about what's actually loaded.

The config layers `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` directly (no `FlatCompat` shim — the Next 16 config is already flat-native), then adds Prettier integration and a small set of project-specific overrides.

### Stack

| Layer | Tool |
|-------|------|
| Linter | ESLint 9 (flat config) |
| Formatter | Prettier |
| Next.js rules | `eslint-config-next` (Core Web Vitals preset + TypeScript preset) |
| TypeScript rules | `typescript-eslint` (transitive via Next) |
| React rules | `eslint-plugin-react`, `eslint-plugin-react-hooks` (transitive via Next) |
| Accessibility rules | `eslint-plugin-jsx-a11y` (transitive via Next) |
| Import hygiene | `eslint-plugin-import` (transitive via Next; resolver is `eslint-import-resolver-typescript`) |

### Rule highlights

The full rule list is in `eslint.config.mjs`. Notable rules:

**General**

- `no-console`: warn (production code shouldn't ship logs)
- `@typescript-eslint/no-unused-vars`: error (stricter than the plain JS version)

**Prettier**

- `prettier/prettier`: formatting failures are lint errors. Run `npm run format` to fix. Treating formatting as a lint failure means "ready to lint" and "ready to commit" mean the same thing; no separate format-check step.

**Imports**

- `import/no-cycle`: error (circular imports break HMR and tree-shaking)
- `import/order`: warn (alphabetized within group, blank lines between groups)

**React / Hooks** (defaults follow `eslint-config-next`)

- `react-hooks/rules-of-hooks`: error
- `react-hooks/exhaustive-deps`: warn
- `react-hooks/set-state-in-effect`, `react-hooks/refs`, `react-hooks/static-components`: warn (downgraded from default error). The eslint-plugin-react-hooks 5 → 7 bump activated the React Compiler rule set, which the legacy components in this repo violate in many places — these stay as warnings until a dedicated React-Compiler-prep PR addresses them.

**Accessibility (jsx-a11y)**

- `jsx-a11y/alt-text`: error (`<img>` and SVG components must have alt text or `aria-hidden`)
- Plus the rest of `eslint-plugin-jsx-a11y`'s recommended set, inherited from `eslint-config-next`.

`eslint-config-next`'s rule defaults shift between versions; re-verify the override list whenever the package is bumped.

## Stylelint

The CSS Modules surface gets its own linter — ESLint can't see CSS files. Stylelint runs `stylelint-config-standard` plus four project-specific overrides:

- **`selector-class-pattern`** — class names use camelCase (`.signupForm`, not `.signup-form`) so `styles.signupForm` is the import-friendly form. The standard config defaults to kebab-case which doesn't match.
- **`keyframes-name-pattern`** — same camelCase convention as classes for internal consistency.
- **`property-no-unknown`** — adds `composes` to `ignoreProperties`. CSS Modules' `composes` directive looks like an unknown CSS property to vanilla parsers but is the canonical way to share input baselines (Dropdown ← ProtoInput, Chip variants ← Chip base).
- **`property-no-deprecated`** — adds `clip` to `ignoreProperties`. The `clip: rect(...)` rule is the canonical visually-hidden ("sr-only") pattern; `clip-path` is the modern replacement for layout but the screen-reader recipe still uses `clip` for the widest-tested cross-browser behavior.

## Knip

Knip detects unused files, unused exports, unused dependencies, and unlisted dependencies. The config (`knip.json`) is intentionally minimal — Knip auto-discovers entry points (`next.config.ts`, `vitest.config.mts`, `eslint.config.mjs`, `stylelint.config.mjs`, the App Router `page`/`layout`/etc. files) and resolves plugin references through the project's eslint and stylelint configs.

The only entry in `ignoreDependencies` is `@svgr/webpack`, which is referenced as a string (loader name) in `next.config.ts` rather than imported. Knip can't see string references inside config files.

Knip runs in `error` mode for every category — any finding fails the build. The intent is that any new dead code is caught at PR time. If a finding is a false positive, expand the ignore list with a clear explanation in `knip.json`; don't downgrade the severity.

## Prettier

Prettier handles formatting (TS / TSX / JS / JSX / JSON / CSS) for both the editor (via the VS Code extension) and CI (via `npm run format:check` and the `prettier/prettier` ESLint rule). No project-specific config — defaults are fine.

## Running

Pre-commit hooks run all of these on `git commit` (see [devops.md → Linting](devops.md#linting)). To run them manually from `frontend/`:

```sh
npm run lint           # ESLint
npm run lint:css       # Stylelint
npm run lint:dead      # Knip
npm run lint:types     # tsc --noEmit
npm run format         # Prettier (write)
npm run format:check   # Prettier (check)
```

CI runs the same set per PR; see `.github/workflows/lint.yml`.

## Disabling rules

Don't disable rules wholesale in config; disable at the file or line level when there's a real reason:

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _intentionallyUnused = setup();
```

If you find yourself disabling the same rule across many files, that's a signal to revisit the rule itself or the code pattern, not to keep papering over it.

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — surfaces lint errors inline.
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) — CSS Modules linting in the editor.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — format-on-save.

All three pick up the project config automatically when the editor is opened at the repo root.

## Resources

- [ESLint](https://eslint.org/docs/latest/)
- [Stylelint](https://stylelint.io/)
- [Knip](https://knip.dev/)
- [Prettier](https://prettier.io/docs/)
- [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint)
- [typescript-eslint](https://typescript-eslint.io/)
