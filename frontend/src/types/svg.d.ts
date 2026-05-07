// SVGR transforms `*.svg` imports into React components at build time
// (see next.config.ts and vitest.config.mts). TypeScript needs an ambient
// module declaration to resolve the imports — SVGR doesn't emit `.d.ts`
// files of its own.

declare module "*.svg" {
  import type React from "react";
  const SVG: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
