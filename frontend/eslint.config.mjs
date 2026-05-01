import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintPluginPrettierRecommended,
  {
    plugins: { tailwindcss: eslintPluginTailwindcss },
    rules: {
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "error",
      "tailwindcss/classnames-order": "error",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    ignores: ["node_modules/", ".next/", "out/", "build/", "coverage/"],
  },
];
