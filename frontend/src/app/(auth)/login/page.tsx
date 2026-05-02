/**
 * Login page route at `/login`.
 *
 * Renders inside the `(auth)` route group's layout (which provides
 * the side-illustration pane and AuthNav). Defers to the
 * `LoginForm` feature component for the actual form.
 */

import LoginForm from "@/features/session/components/LoginForm";

export default function Page() {
  return <LoginForm />;
}
