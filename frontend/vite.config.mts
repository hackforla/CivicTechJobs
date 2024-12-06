import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { resolve, join } from "path";

export default defineConfig(() => {
  const INPUT_DIR = "./src";
  const OUTPUT_DIR = "./dist";

  return {
    //to resolve relative file paths for sass (no plugin)
    resolve: {
      alias: {
        "@": resolve(INPUT_DIR),
      },
    },
    root: resolve(INPUT_DIR),
    //keep static assets path consistent with django
    base: "/static/",
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
      outDir: resolve(OUTPUT_DIR),
      rollupOptions: {
        input: {
          entry: join(INPUT_DIR, "/index.tsx"),
        },
      },
    },
  };
});
