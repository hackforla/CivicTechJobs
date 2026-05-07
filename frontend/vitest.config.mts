import path from "node:path";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    // Mirrors next.config.ts SVGR rules so `.svg` imports resolve to React
    // components in tests too.
    svgr({
      include: "**/*.svg",
      svgrOptions: { exportType: "default" },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/**/*.{test,spec}.{ts,tsx}",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
