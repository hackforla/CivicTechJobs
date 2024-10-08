import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      indent: ["error", 2],
      "no-irregular-whitespace": "error",
      "prettier/prettier": "error",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "error",
    },
  },
  {
    ignores: ["node_modules/", "*.config.js", "tests/__mocks__/*"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      tailwindcss: eslintPluginTailwindcss,
    },
  },
];
