import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

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
      "indent": ["error", 2],
      "no-irregular-whitespace": "error",
    }
    
  },
  {
    ignores: [
      "node_modules/",
      "*.config.js",    
      "tests/__mocks__/*",  
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
