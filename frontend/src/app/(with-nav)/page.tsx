/**
 * Landing page route at `/`.
 *
 * Renders inside the `(with-nav)` route group's layout
 * (HeaderNav + FooterNav). Defers to the `LandingPage` feature
 * component for the actual content.
 */

import { LandingPage } from "@/features/landing/components/LandingPage";

export default function Page() {
  return <LandingPage />;
}
