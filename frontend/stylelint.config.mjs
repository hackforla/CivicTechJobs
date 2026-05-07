// CSS Modules linting. Companion to eslint.config.mjs and the prettier
// integration: stylelint covers the *.css surface that ESLint cannot see.
//
// `stylelint-config-standard` is the project's base rule set. The two
// overrides below adapt it to the CSS-Modules conventions added in the
// Tailwind→CSS-Modules sweep:
//
//   - selector-class-pattern: stylelint-config-standard enforces kebab-case
//     class names by default. Project convention is camelCase to match the
//     JS-import-friendly form (`styles.signupForm` not `styles["signup-form"]`).
//
//   - property-no-unknown: `composes` is the CSS-Modules-only directive used
//     to share input baselines (Dropdown ← ProtoInput, Chip variants ← Chip
//     base). It looks like an unknown CSS property to vanilla parsers.

const config = {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      {
        message: "Class names use camelCase to match JS-import shape",
      },
    ],
    "property-no-unknown": [true, { ignoreProperties: ["composes"] }],
    // Keyframe names follow the same camelCase convention as class names so
    // the codebase stays internally consistent.
    "keyframes-name-pattern": "^[a-z][a-zA-Z0-9]*$",
    // `clip: rect(...)` is the canonical visually-hidden ("sr-only") pattern;
    // clip-path is the modern replacement for layout, but the screen-reader
    // recipe still uses clip for the widest-tested cross-browser behavior.
    "property-no-deprecated": [true, { ignoreProperties: ["clip"] }],
  },
  ignoreFiles: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
  ],
};

export default config;
