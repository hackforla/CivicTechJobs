/**
 * Signup page route at `/signup`.
 *
 * Renders inside the `(auth)` route group's layout (which provides
 * the side-illustration pane and AuthNav). Defers to the
 * `SignupForm` feature component for the actual form.
 */

import SignupForm from "@/features/session/components/SignupForm";

export default function Page() {
  return <SignupForm />;
}
