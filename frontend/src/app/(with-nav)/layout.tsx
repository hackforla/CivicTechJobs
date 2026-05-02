/**
 * Layout for the `(with-nav)` route group.
 *
 * Wraps the public-facing pages (landing, qualifier flow, credits,
 * privacy policy) with the standard site chrome: `HeaderNav` at
 * the top and `FooterNav` at the bottom. The `(auth)` route group
 * uses a different layout for login/signup pages.
 */

import FooterNav from "@/shared/components/nav/FooterNav";
import HeaderNav from "@/shared/components/nav/HeaderNav";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderNav />
      {children}
      <FooterNav />
    </>
  );
}
