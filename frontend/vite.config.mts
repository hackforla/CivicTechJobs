import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig(() => {
  return {
    //to resolve relative file paths for sass (no plugin)
    resolve: {
      alias: {
        "@": resolve("./src"),
      },
    },
    plugins: [
      svgr(),
      react(),
      //to resolve relative file paths for tsx
      tsconfigPaths(),
    ],
    server: {
      host: true,
      port: 5175,
      origin: "http://127.0.0.1:5175",
      watch: {
        usePolling: true,
      },
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: "static/[name]-[hash][extname]",
          chunkFileNames: "static/[name]-[hash].js",
          entryFileNames: "static/[name]-[hash].js",
        },
      },
    },
  };
});
