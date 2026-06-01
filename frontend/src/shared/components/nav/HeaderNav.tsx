/**
 * Top-of-page navigation header for the `(with-nav)` route group.
 *
 * Renders the CTJ logo (linking home), three external links to
 * Hack for LA org pages, an auth control on the right, and a mobile
 * hamburger menu trigger. The `(auth)` route group uses a different
 * `AuthNav` component.
 *
 * Auth control: there is no Figma frame for the signed-in nav state
 * - the original app had no auth UI at all. Until a design exists,
 * the signed-in state is a deliberately minimal "Log out" button in
 * the same slot the "Log In" link occupies: no avatar, no account
 * menu, no name. While `useAuth().loading` is true (the initial
 * `me()` round-trip) `user` is still `null`, so the slot shows the
 * signed-out state; a logged-in user sees a brief "Log In" ->
 * "Log out" flip on first paint, which is acceptable for the
 * interim shape. `logout()` only clears context state - no redirect,
 * since nothing is behind auth yet.
 *
 * The hamburger button is currently inert - `aria-expanded` is
 * hard-coded to `"false"` and there's no click handler to open a
 * menu. The mobile menu interaction is unimplemented; flagging as
 * a bug to expand on later.
 */

"use client";

import Link from "next/link";

import { Button } from "@/shared/components/Buttons";
import { useAuth } from "@/shared/contexts/AuthContext";
import IconHamburgerMenu from "@/shared/icons/icon-hamburger-menu.svg";
import LogoHorizontal from "@/shared/images/logos/logo-horizontal.svg";

import styles from "./HeaderNav.module.css";

interface MenuObject {
  name: string;
  link: string;
}

const menuItems: MenuObject[] = [
  { name: "Hack for LA", link: "https://www.hackforla.org/" },
  { name: "How to Join", link: "https://www.hackforla.org/getting-started" },
  { name: "Projects", link: "https://www.hackforla.org/projects/" },
];

function Logo() {
  return (
    <Link href="/" aria-label="Civic Tech Jobs - Home">
      <LogoHorizontal className={styles.logo} aria-hidden="true" />
    </Link>
  );
}

function AuthControl() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <Button
        size="small"
        className={styles.loginLink}
        onClick={() => void logout()}
      >
        Log out
      </Button>
    );
  }

  return (
    <Link href="/login" className={styles.loginLink}>
      <Button size="small">Log In</Button>
    </Link>
  );
}

function HeaderNav() {
  return (
    <header className={styles.header}>
      <div>
        <Logo />
      </div>

      <div className={styles.right}>
        <nav className={styles.nav} aria-label="header-navigation">
          {menuItems.map((item) => (
            <a
              className={styles.menuItem}
              href={item.link}
              rel="noopener noreferrer"
              key={item.link}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <AuthControl />
        <button
          className={styles.hamburger}
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu Options"
        >
          <IconHamburgerMenu />
        </button>
      </div>
    </header>
  );
}

export default HeaderNav;
