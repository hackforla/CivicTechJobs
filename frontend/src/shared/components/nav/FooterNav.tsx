/**
 * Bottom-of-page navigation footer for the `(with-nav)` route group.
 *
 * Renders the CTJ logo (linking home), an internal-link nav row
 * (Credits, Sitemap, Join Us), and a "Donate" button linking to
 * Hack for LA's donation page. The Sitemap link currently points
 * to `#` because the sitemap page is unimplemented; flagging as a
 * bug.
 *
 * Two logo variants are present (horizontal + stacked); CSS swaps
 * which one is visible based on viewport width.
 */

import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/shared/components/Buttons";
import LogoHorizontalOnDark from "@/shared/images/logos/logo-horizontal-on-dark.svg";
import LogoStackedOnDark from "@/shared/images/logos/logo-stacked-on-dark.svg";

import styles from "./FooterNav.module.css";

interface MenuObject {
  name: string;
  link: string;
}

const menuItems: MenuObject[] = [
  { name: "Credits", link: "/credits" },
  { name: "Sitemap", link: "#" },
  { name: "Join Us", link: "/qualifier/1" },
];

function Logo() {
  return (
    <Link
      className={styles.logoLink}
      href="/"
      aria-label="Civic Tech Jobs - Home"
    >
      <LogoHorizontalOnDark
        className={styles.logoHorizontal}
        aria-hidden="true"
      />
      <LogoStackedOnDark className={styles.logoStacked} aria-hidden="true" />
    </Link>
  );
}

function FooterNav() {
  return (
    <footer className={styles.footer}>
      <Logo />
      <nav className={styles.nav} aria-label="footer-navigation">
        {menuItems.map((item) => (
          <Fragment key={item.link}>
            <div className={styles.divider}></div>
            <Link className={styles.menuItem} href={item.link}>
              {item.name}
            </Link>
          </Fragment>
        ))}
      </nav>
      <div className={styles.donateWrap}>
        <Button
          size="small"
          variant="primary-dark"
          href="https://www.hackforla.org/donate/"
        >
          Donate
        </Button>
      </div>
    </footer>
  );
}

export default FooterNav;
