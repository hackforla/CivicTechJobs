/**
 * Privacy policy page route at `/privacy-policy`.
 *
 * Renders inside the `(with-nav)` route group's layout. Defers to
 * the `PrivacyPolicyPage` feature component for the actual content.
 */

import { PrivacyPolicyPage } from "@/features/privacy-policy/PrivacyPolicyPage";

export default function Page() {
  return <PrivacyPolicyPage />;
}
