"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { IconButton } from "./Buttons";
import IconX from "@/shared/icons/icon-x.svg";
import { cn } from "@/shared/lib/utils";
import styles from "./CookieBanner.module.css";

function CookieBanner() {
  // Read the cookie after mount so server-rendered HTML (no cookie
  // access) matches the first client render. Returning null until
  // mounted avoids the hydration mismatch that surfaces when a user
  // who has already consented loads any page.
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
