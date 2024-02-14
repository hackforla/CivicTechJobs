import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";
import path from 'path';

export default defineConfig({
  //to resolve relative file paths for sass (no plugin)
  mode: 'development',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    svgr(),
    react(),
    //to resolve relative file paths for tsx
    tsconfigPaths(),
    createHtmlPlugin({
      entry: "/src/index.tsx",
      template: "/src/templates/vite-index.html",
      inject: {
        data: {
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
});
