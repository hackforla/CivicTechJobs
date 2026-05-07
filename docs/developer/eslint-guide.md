# ESLint Guide

The frontend is linted with ESLint 9 (flat config) and formatted with Prettier. Configuration lives at [frontend/eslint.config.mjs](https://github.com/hackforla/CivicTechJobs/blob/main/frontend/eslint.config.mjs).

ESLint 9's flat config replaces the legacy `.eslintrc` cascade with explicit imports and a single config array; less magic resolution, easier to reason about what's actually loaded.

## Stack

| Layer | Tool |
|-------|------|
| Linter | ESLint 9 (flat config) |
| Formatter | Prettier |
| Next.js rules | `eslint-config-next` (Core Web Vitals preset) |
| TypeScript rules | `typescript-eslint` |
| React Hooks rules | `eslint-plugin-react-hooks` |
| Accessibility rules | `eslint-plugin-jsx-a11y` |

## Rule highlights

The full rule list is in `eslint.config.mjs`. Notable rules:

**General**

- `no-unused-vars`: warn (TypeScript catches the type-level cases as errors)
- `no-console`: warn (production code shouldn't ship logs)
- `no-irregular-whitespace`: error

**Prettier**

- `prettier/prettier`: formatting failures are lint errors. Run `npm run format` to fix. Treating formatting as a lint failure means "ready to lint" and "ready to commit" mean the same thing; no separate format-check step.

**React / Hooks** (defaults follow `eslint-config-next`'s recommended set; CTJ-specific overrides noted below)

- `react/no-unescaped-entities`: disabled. Civic content text has lots of apostrophes and quotes; the rule is too noisy for that content shape.
- `react-hooks/rules-of-hooks`: error (hooks must run in the right context)
- `react-hooks/exhaustive-deps`: warn (missing dependency arrays)

**TypeScript**

- `@typescript-eslint/no-unused-vars`: error (stricter than the plain JS version)

**Accessibility (jsx-a11y)**

- `jsx-a11y/alt-text`: error (`<img>` and `<Image>` must have alt text)
- Plus the rest of `eslint-plugin-jsx-a11y`'s recommended set, inherited from `eslint-config-next`.

`eslint-config-next`'s rule defaults shift between versions; re-verify the override list whenever the package is bumped.

## Running

Lint normally runs automatically via pre-commit on `git commit` (see [devops.md → Linting](devops.md#linting)). Run manually from `frontend/` when you want to lint without committing:

```sh
npm run lint     # Lint all .js/.jsx/.ts/.tsx files; auto-fixes what it can
npm run format   # Format all JS/TS/JSON files via Prettier
```

> **TODO** - CI lint job. Will run `npm run lint` on every PR via `.github/workflows/lint.yml` and fail the build on lint errors. The legacy Super-Linter setup at `.github/workflows/linter.yml` is `disabled_manually` and stale; both land in the post-merge cleanup PR. Until then, pre-commit on the host is the only enforcement layer.

## Disabling rules

Don't disable rules wholesale in the config; disable at the file or line level when you have a real reason:

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _intentionallyUnused = setup();
```

If you find yourself disabling the same rule across many files, that's a signal to revisit the rule itself or the code pattern, not to keep papering over it.

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): surfaces lint errors inline as you type.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): format-on-save support.

Both should pick up the project config automatically when the editor is opened at the repo root.

## Resources

- [ESLint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/)
- [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint)
- [typescript-eslint](https://typescript-eslint.io/)
