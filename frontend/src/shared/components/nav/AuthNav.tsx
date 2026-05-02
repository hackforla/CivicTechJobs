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
