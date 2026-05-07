import LogoHorizontal from "@/shared/images/logos/logo-horizontal.svg";
import IconArrowLeft from "@/shared/icons/icon-arrow-left.svg";
import styles from "./AuthNav.module.css";

function AuthNav() {
  return (
    <header className={styles.header}>
      <div className={styles.backWrap}>
        <a href="/" aria-label="Back to home">
          <IconArrowLeft className={styles.arrow} aria-hidden="true" />
        </a>
      </div>
      <div>
        <a href="/" rel="noopener noreferrer" aria-label="Civic Tech Jobs - Home">
          <LogoHorizontal className={styles.logo} aria-hidden="true" />
        </a>
      </div>
      <div className={styles.spacer}></div>
    </header>
  );
}

export default AuthNav;
