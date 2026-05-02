import Link from "next/link";

import IconArrowDown from "@/shared/icons/icon-arrow-down.svg";
import LandingPageFg from "@/shared/images/landing-page-fg.svg";
import styles from "./LandingPageIntro.module.css";

function LandingPageIntro() {
  return (
    <div className={styles.section}>
      <div className={styles.intro}>
        <h1 className={styles.heading}>
          Together,
          <br />
          we can create greater civic change
        </h1>
        <p className={styles.body}>
          CivicTechJobs unites ambitious technology practitioners with volunteer
          opportunities from a central hub of listings to build digital
          products, programs, and services.
        </p>
        <Link href="/qualifier/1" className={styles.cta}>
          Join us
        </Link>
        <div className={styles.bgWrap}>
          <LandingPageFg className={styles.fgImage} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.mission}>
        <IconArrowDown className={styles.missionArrow} aria-label="Arrow Down Icon" />
        <h2 className={styles.missionTitle}>Our Mission</h2>
        <p className={styles.missionBody}>
          We bring together civic-minded volunteers from diverse backgrounds
          such as YOU to help local communities and governments. Thanks to the
          power of our volunteers, we are able to positively impact the
          communities of Los Angeles region and beyond!
        </p>
      </div>
    </div>
  );
}

export { LandingPageIntro };
