/**
 * Credits page route at `/credits`.
 *
 * Renders inside the `(with-nav)` route group's layout. Defers to
 * the `CreditsPage` feature component for the actual content.
 */

import { CreditsPage } from "@/features/credits/components/CreditsPage";

export default function Page() {
  return <CreditsPage />;
}
