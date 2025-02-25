import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const SERVER_URL = `${
    process.env.VITE_APP_SERVER_URL ?? "http://localhost:8000"
  }`;

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
      proxy: {
        "/api": {
          target: `${SERVER_URL}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
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
