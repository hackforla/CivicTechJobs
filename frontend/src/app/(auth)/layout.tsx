/**
 * Layout for the `(auth)` route group (login + signup pages).
 *
 * Renders a two-column shell: a left illustration pane (decorative
 * background, tagline, and the team-work illustration) and a right
 * form pane that the page's child component (`LoginForm` or
 * `SignupForm`) drops into.
 *
 * Distinct from the `(with-nav)` layout - auth pages get their
 * own minimal `AuthNav` instead of the full `HeaderNav` /
 * `FooterNav` chrome, so the visual emphasis stays on the form.
 */

import AuthNav from "@/shared/components/nav/AuthNav";
import Dots from "@/shared/images/dots.svg";
import LoginIllustration from "@/shared/images/login-illustration.svg";
import LoginTanBg from "@/shared/images/login-tan-bg.svg";

import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNav />
      <div className={styles.shell}>
        <div className={styles.illustrationPane}>
          <div className={styles.illustrationContent}>
            <p className={styles.tagline}>
              Together, we can create
              <br /> civic change.
            </p>
            <LoginIllustration
              aria-label="Team work Pana Illustration"
              className={styles.illustration}
            />
          </div>
          <LoginTanBg aria-hidden="true" className={styles.tanBg} />
          <Dots aria-hidden="true" className={styles.dotsTopRight} />
          <Dots aria-hidden="true" className={styles.dotsBottomLeft} />
        </div>
        <div className={styles.formPane}>
          <div className={styles.formInner}>
            <div className={styles.formColumn}>
              <div className={styles.formCard}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
