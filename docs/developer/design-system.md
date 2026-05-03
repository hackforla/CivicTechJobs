# Design System

The CivicTechJobs Design System (CTJ-DS) is the shared visual + interaction language for the frontend. The source of truth lives in the [Figma file](https://www.figma.com/file/G5bOqhud6azbxyR9El9Ygp/Civic-Tech-Jobs); the implementation lives in `frontend/components/`.

## Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Library | React 19 |
| Types | TypeScript 6 |
| Styling | CSS Modules (Next.js built-in) |
| Theme | CSS custom properties in `app/globals.css` |

The Next.js frontend uses Next.js's built-in CSS Modules support. No Tailwind, no styled-components, no CSS-in-JS runtime. Each component co-locates a `Component.module.css` next to its `.tsx` file; class names are scoped to the component automatically.

CSS Modules over the alternatives because: scoped class names without runtime cost (the scoping happens at build time), theme via CSS custom properties (no JS-runtime tokens to import), and clean compatibility with React Server Components (no client-side hydration for styles).

The component system is **CSS-Modules-styled + TypeScript-typed React components**.

## Source of truth

Figma is canonical for visual decisions. Any divergence between code and Figma is a code bug unless explicitly documented. When implementing a Figma design:

- Use the design tokens (colors, typography, spacing) Figma exposes, not eyeballed values.
- Implement at the two anchor viewports: **1440px (desktop)** and **375px (mobile)**.
- Behavior between those breakpoints is the developer's call, guided by the breakpoint custom properties.

## Theme tokens

Theme values (colors, typography, spacing scale, breakpoints) live as CSS custom properties in the global stylesheet:

```css
/* frontend/app/globals.css */
:root {
  --color-primary: ...;
  --color-primary-dark: ...;
  --font-family-sans: ...;
  --font-size-display: ...;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  /* etc. */
}
```

These map 1:1 to Figma's design tokens. Adding a new token means adding it to Figma first, then mirroring the value in `globals.css`. Components consume tokens via `var(--token-name)` in their module CSS.

CSS custom properties (over JS-imported constants) because tokens are available at runtime in CSS without build-time generation; theme changes don't require recompiles, and Server Components can use them without shipping any JS to the browser.

## Component library structure

Components live at `frontend/components/`, organized by purpose:

```
frontend/
├── app/                              # App Router pages, layouts, route handlers
│   └── globals.css                   # Global CSS custom properties (theme tokens)
├── components/
│   ├── ui/                           # Atoms (Button, Checkbox, TextField, Typography)
│   │   └── Button/
│   │       ├── Button.tsx
│   │       └── Button.module.css     # Component-scoped styles
│   ├── nav/                          # Header / footer / auth nav
│   ├── cards/                        # Card variants (Standard, Circle)
│   ├── feedback/                     # Dialog, Cookie banner, etc.
│   └── index.ts                      # Barrel export
└── lib/                              # Shared utilities
    ├── api.ts                        # API client (fetch wrappers, typed response helpers)
    ├── format.ts                     # Date / currency / pluralization helpers
    └── types.ts                      # Cross-component shared types
```

Each component is a `.tsx` file with a typed prop interface, paired with a `.module.css` for styles. No PropTypes (TypeScript types replace them).

Path imports use the `@/` alias (configured in `tsconfig.json`; `@/` resolves to `frontend/`). So `@/lib/format` means `frontend/lib/format.ts`. Standard Next.js convention.

## CSS Modules basics

Each component imports its module styles:

```tsx
// frontend/components/ui/Button/Button.tsx
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export function Button({ variant = "primary", children }: ButtonProps) {
  return <button className={styles[variant]}>{children}</button>;
}
```

```css
/* frontend/components/ui/Button/Button.module.css */
.primary {
  background: var(--color-primary);
  color: white;
}

.secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid currentColor;
}
```

Class names are scoped automatically; `.primary` in one module does not collide with `.primary` in another.

## Server vs client components

Next.js App Router defaults all components to **server components**. Use client components (`"use client"` directive at the top of the file) only when one of the following is needed:

- Browser-only state (`useState`, `useReducer`)
- Effects (`useEffect`)
- Event handlers tied to user interaction (`onClick`, `onSubmit` on forms not handled by server actions)
- Browser-only APIs (`window`, `localStorage`)

Server-component default because: smaller browser bundles (component code never ships to the client), faster initial paint (HTML rendered server-side), and secrets / credentials stay on the server (no risk of leaking env values into client JS).

For example, `Typography` and `StandardCard` are server components; `Dialog` and `CookieBanner` are client components.

## Responsive design

Write media queries in module CSS. The breakpoints in `globals.css` are the source of truth:

```css
/* Card.module.css */
.card {
  width: 100%;
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .card {
    width: 50%;
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .card {
    width: 33.33%;
    padding: var(--space-8);
  }
}
```

For elements that need both **scalable** behavior (smoothly grows with the viewport) and **responsive** behavior (snaps at a breakpoint), combine fractional widths with media queries as above.

Layouts use CSS Grid (`display: grid; grid-template-columns: repeat(12, 1fr);`) and Flexbox written directly in module CSS.

## SVG assets

Two patterns:

- **As React components**, for SVGs that need props (e.g., theme-driven fill colors). Configure SVGR or Next.js's built-in SVG support and import as a React component:
    ```tsx
    import styles from "./Header.module.css";
    import Logo from "@/assets/logo.svg";
    <Logo className={styles.logo} />
    ```
- **As `<Image>` source**, for static SVGs displayed at known sizes. Use `next/image`:
    ```tsx
    import logoSrc from "@/assets/logo.svg";
    <Image src={logoSrc} alt="CivicTechJobs" width={128} height={32} />
    ```

Pick based on whether the SVG needs to react to props.

## Accessibility

- WCAG 2.2 Level AA is the target compliance level.
- All interactive elements must be keyboard-navigable.
- All images need `alt` text; decorative SVGs use `aria-hidden="true"`.
- The `eslint-plugin-jsx-a11y` rules catch most static issues (see [frontend-lint-guide.md](frontend-lint-guide.md)).
- Use `@axe-core/react` in development to catch runtime issues; it logs accessibility warnings to the browser console.

## Resources

- [Figma file](https://www.figma.com/file/G5bOqhud6azbxyR9El9Ygp/Civic-Tech-Jobs)
- [Next.js CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React 19](https://react.dev/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
