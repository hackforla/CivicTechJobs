/**
 * Ambient declarations for SVG module imports (handled by SVGR).
 *
 * SVGR transforms `*.svg` imports into React components at build
 * time (see `next.config.ts` and `vitest.config.mts`). TypeScript
 * needs the declaration below to resolve those imports - SVGR
 * doesn't emit `.d.ts` files of its own.
 */

declare module "*.svg" {
  import type React from "react";
  const SVG: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
