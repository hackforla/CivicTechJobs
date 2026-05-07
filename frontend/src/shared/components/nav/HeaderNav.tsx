import Link from "next/link";

import { Button } from "@/shared/components/Buttons";
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

        <Link href="/login" className={styles.loginLink}>
          <Button size="small">Log In</Button>
        </Link>
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
