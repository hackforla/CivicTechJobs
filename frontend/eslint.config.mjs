import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "import/no-cycle": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // The eslint-plugin-react-hooks 5 → 7 bump activated the React Compiler
      // rule set. The legacy components in this repo (mount-then-render gates,
      // refs read in render, locally-declared subcomponents) violate them in
      // many places — a real refactor, not a lint-config concern. Downgraded
      // to warnings so the signal is visible in dev/CI without blocking merge.
      // TODO: remove these overrides as the violations are addressed.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/static-components": "warn",
    },
  },
  {
    ignores: ["node_modules/", ".next/", "out/", "build/", "coverage/"],
  },
];

export default config;
