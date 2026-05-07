/**
 * Site-wide cookie consent banner.
 *
 * Mounted from the root layout, so it appears on every page until
 * the user accepts or declines. Choice is persisted in a
 * `cookieConsent` cookie (string `"true"` or `"false"`, 1-year
 * expiry); subsequent visits read the cookie at mount and skip
 * rendering if already set.
 *
 * Hydration note: the cookie can only be read on the client, so
 * SSR HTML always renders the banner shell. Returning `null` until
 * `mounted` flips true is what avoids a hydration mismatch for
 * users who have already consented (server renders the banner
 * visible, client would render it hidden).
 *
 * The X close button hides the banner without persisting consent
 * state - clicking close is treated as "ask me again next page
 * load", which is intentional for users who don't want to commit
 * to a choice yet.
 */

"use client";
/* eslint-disable react/no-unescaped-entities */

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

import IconX from "@/shared/icons/icon-x.svg";
import { cn } from "@/shared/lib/utils";

import { IconButton } from "./Buttons";
import styles from "./CookieBanner.module.css";

function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setIsHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (Cookies.get("cookieConsent") !== undefined) {
      setIsHidden(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setIsHidden(true);
  };

  const handleDeclineCookies = () => {
    Cookies.set("cookieConsent", "false", { expires: 365 });
    setIsHidden(true);
  };

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-label="cookies banner"
      className={cn(styles.banner, hidden && styles.bannerHidden)}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.title}>This site use cookies!</p>
          <IconButton
            Icon={IconX}
            label="close"
            onClick={() => {
              setIsHidden(true);
            }}
          />
        </div>
        <p className={styles.body}>
          We use cookies to improve your experience. By clicking "Accept
          Cookies", you are agreeing to the collection of data as described in
          our{" "}
          <a href="/privacy-policy" className={styles.link}>
            Cookie Policy
          </a>
        </p>
        <div className={styles.actions}>
          <button className={styles.accept} onClick={handleAcceptCookies}>
            Accept
          </button>
          <button className={styles.decline} onClick={handleDeclineCookies}>
            No Thanks
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
