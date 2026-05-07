/**
 * Qualifier flow route at `/qualifier/<page>` (dynamic segment).
 *
 * The `[page]` segment is a string identifier that the
 * `QualifierConsole` reads from `useParams()` to decide which
 * step component to render. Renders inside the `(with-nav)` route
 * group's layout.
 */

import { QualifierConsole } from "@/features/qualifier/components/QualifierConsole";

export default function Page() {
  return <QualifierConsole />;
}
