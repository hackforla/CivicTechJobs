/**
 * Minimal navigation header for the `(auth)` route group.
 *
 * Distinct from `HeaderNav`: this version renders only a back-arrow
 * link to `/` and the CTJ logo (also linking home). No external
 * org links, no login button, no hamburger menu - the auth pages
 * (login, signup) want minimal chrome so the visual emphasis stays
 * on the form.
 */

import Link from "next/link";

import IconArrowLeft from "@/shared/icons/icon-arrow-left.svg";
import LogoHorizontal from "@/shared/images/logos/logo-horizontal.svg";

import styles from "./AuthNav.module.css";

function AuthNav() {
  return (
    <header className={styles.header}>
      <div className={styles.backWrap}>
        <Link href="/" aria-label="Back to home">
          <IconArrowLeft className={styles.arrow} aria-hidden="true" />
        </Link>
      </div>
      <div>
        <Link href="/" aria-label="Civic Tech Jobs - Home">
          <LogoHorizontal className={styles.logo} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.spacer}></div>
    </header>
  );
}

export default AuthNav;
