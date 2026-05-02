/**
 * Next.js root not-found page.
 *
 * Mounted automatically by Next when an unmatched route resolves
 * outside any nested `not-found.tsx` boundary. Defers to the
 * feature component in `src/features/not-found/` for the actual
 * UI; this file just exists to wire the framework convention to
 * the feature.
 */

import { NotFoundPage } from "@/features/not-found/NotFoundPage";

export default function NotFound() {
  return <NotFoundPage />;
}
