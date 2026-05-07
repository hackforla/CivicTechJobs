# ADR-0004: CSS Modules without a preprocessor

**Status:** Accepted
**Date:** 2026-05-02

## Context

Pre-rewrite, CTJ's styling stack was Tailwind CSS for utility classes (with custom theme tokens, dark-mode variants, and `eslint-plugin-tailwindcss`), SCSS / `.module.scss` files where Tailwind didn't fit, PostCSS with autoprefixer + postcss-import for legacy targeting and `@import` resolution, and a custom `cn()` utility wrapping `clsx` + `twMerge` for conditional class composition.

The stack was idiomatic Tailwind-app shape and worked. The rewrite was an opportunity to ask whether the layered tooling earned its weight against the maintenance burden: keeping Tailwind config in sync with design tokens, the SCSS/PostCSS pipeline, `eslint-plugin-tailwindcss` rules drifting from the Tailwind major, and `tailwind-merge`'s class-conflict-resolver complexity.

The codebase's volunteer maintainers span varying frontend backgrounds; the styling stack's complexity is a maintenance tax that compounds if the stack isn't a load-bearing part of the project's value proposition.

## Decision

**Strip the styling stack to plain CSS Modules. No preprocessor (no SCSS, no PostCSS, no autoprefixer). Theme tokens move to CSS custom properties on `:root`. Breakpoints inline as literal pixel values in `@media` queries. Each component co-locates its `.module.css` next to its `.tsx`.**

Concretely:

- Drop `tailwindcss`, `tailwind-merge`, `eslint-plugin-tailwindcss`, `sass`, `autoprefixer`, `postcss`, `postcss-import` from `package.json`.
- Tailwind theme values rewritten as CSS custom properties on `:root` in `src/app/globals.css`.
- Breakpoints inlined as literal pixels in `@media` queries (xs 480, sm 577, md 769, lg 1025, xl 1201) - no SCSS variables, no centralized breakpoint module.
- Each `.tsx` has a sibling `.module.css` with locally-scoped class names. CSS Modules' name-mangling provides scope isolation; no BEM, no global utility classes.
- Where two components share an input baseline (Dropdown extending ProtoInput; Chip variants), use CSS Modules' `composes:` directive instead of duplicating styles.
- `cn()` simplifies to a `clsx` passthrough - no `twMerge` needed once Tailwind is gone.
- Dark mode is dropped (was unused at the codebase tip).

Stylelint enforces CSS Modules conventions and catches invalid CSS at lint time.

## Alternatives considered

- **Stay on Tailwind v3 + SCSS.** Familiar, idiomatic, lots of community resources. Discarded because the maintenance tax (Tailwind config sync, eslint-plugin-tailwindcss drift, twMerge complexity) compounds against a small volunteer team. Reducing the surface area is a win.

- **Migrate to Tailwind v4.** Tailwind v4 streamlines a lot of the v3 friction (fewer config files, native CSS-variable-shaped tokens). Discarded because v4 carries the utility-class mental model that small teams either embrace fully or fight constantly - CSS Modules sidesteps the question. The move-to-v4 work would have been comparable in surface area to moving away entirely.

- **CSS-in-JS (styled-components, Emotion, vanilla-extract).** Discarded for two reasons: runtime CSS-in-JS conflicts with Next.js server components in nontrivial ways; vanilla-extract's zero-runtime build pipeline is similar in surface to the SCSS/PostCSS one we're trying to leave.

- **Keep SCSS, drop Tailwind.** Eliminates the Tailwind tax but keeps the SCSS pipeline. Discarded because the SCSS pipeline (sass, postcss, postcss-import, autoprefixer) has its own dependency chain that drifts; dropping it entirely is the cleaner cut. Modern CSS (custom properties, container queries, `:has()`) covers most of what SCSS was doing.

- **Keep `tailwind-merge` and `cn()` even after dropping Tailwind.** Discarded because once Tailwind's atomic class system is gone, there are no conflicting classes to merge - `cn()` reduces to "concatenate truthy strings" which is what `clsx` does in three lines.

## Consequences

**Accepted:**

- Three frontend tests had to be adjusted because they asserted on Tailwind-shaped class names that no longer exist (Calendar drag → `aria-checked`; Notification close → `aria-hidden`; Checkbox `labelHidden` → skipped, jsdom can't apply CSS).

- Dark mode goes away. Re-adding it would mean defining the alternate token values on `[data-theme="dark"]` and toggling via a class on `<html>`. Path documented in the design-system doc as a "if needed, here's how" note.

- Theme tokens are now CSS custom properties; changing one means editing `globals.css`. There is no JS-accessible token export. If JS ever needs design-token values, it has to read them from the computed-style API.

- Breakpoint pixel values live in many `@media` queries. Changing a breakpoint means a project-wide find-and-replace. Acceptable because breakpoints rarely change.

**Won:**

- `package.json`'s frontend dep tree is significantly smaller. `npm install` is faster. Build-time complexity is lower. ESLint's plugin chain is shorter.

- Reading a component's styles means opening one file (`<Component>.module.css`) next to the `.tsx`. No tracing back to a shared SCSS variables file or a Tailwind config or a custom utility class layer.

- Stylelint can be configured against plain CSS, not against a SCSS-flavored variant. The rule set is simpler.

- Dark-mode complexity is gone from the styling-system level. If it returns, it returns as a deliberate addition.
