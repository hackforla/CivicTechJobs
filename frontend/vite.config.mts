import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { resolve, join } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const INPUT_DIR = './src';
  const OUTPUT_DIR = '../backend/vite_assets_dist';
  const SERVER_HOST = env.DJANGO_VITE_DEV_SERVER_HOST
  const SERVER_PORT = env.DJANGO_VITE_DEV_SERVER_PORT

  return {
    //to resolve relative file paths for sass (no plugin)
    resolve: {
      alias: {
        "@": resolve(INPUT_DIR),
      },
    },
    root: resolve(INPUT_DIR),
    base: "/static/",
    plugins: [
      svgr(),
      react(),
      //to resolve relative file paths for tsx
      tsconfigPaths(),
    ],
    server: {
      host: SERVER_HOST,
      port: +SERVER_PORT,
      origin: `http://127.0.0.1:${SERVER_PORT}`,
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      outDir: resolve(OUTPUT_DIR),
      rollupOptions: {
        input: {
          entry: join(INPUT_DIR, '/index.tsx'),
        },
      }
    },
  };
});
