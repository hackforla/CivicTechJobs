"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState, FC } from "react";

import LogoHfla from "@/shared/images/logos/logo-hfla.svg";
import CreditsPageHighFive from "@/shared/images/credits-page-high-five.svg";
import { iconData } from "@/features/credits/data/creditsIconData";
import {
  illustrationData,
  type AssetDatum,
} from "@/features/credits/data/creditsIllustrationData";

import Card from "./Card";
import TopSvg from "./TopSvg";
import BottomSvg from "./BottomSvg";
import { cn } from "@/shared/lib/utils";
import styles from "./CreditsPage.module.css";

const CreditsPage: FC = () => {
  const [activeData, setActiveData] = useState<AssetDatum[]>(illustrationData);
  const [activeButton, setActiveButton] = useState("illustrations");

  const handleClickIllustrationButton = () => {
    setActiveButton("illustrations");
    setActiveData(illustrationData);
  };

  const handleClickIconButton = () => {
    setActiveData(iconData);
    setActiveButton("icons");
  };

  return (
    <div className={styles.page}>
      <div className={styles.heroWrapper}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h3 className={styles.heroTitle}>Credits</h3>
            <p className={styles.heroDescription}>
              Thank you to all of the artists and sponsors who help make our
              projects successful. Check out all of the illustrations and
              iconography we have used on our site.
            </p>
          </div>
          <CreditsPageHighFive
            className={styles.heroIllustration}
            aria-label="High Five Illustration"
          />
        </div>

        <div className={styles.tanStripe}></div>
        <TopSvg className={styles.topSvg} />
      </div>

      <div className={styles.body}>
        <div className={styles.bodyHeader}>
          <h1 className={styles.bodyHeading}>Illustrations & Icongraphy</h1>

          <div className={styles.toggleRow}>
            <div>
              <button
                className={cn(
                  styles.toggleBtn,
                  activeButton === "illustrations"
                    ? styles.toggleBtnActive
                    : styles.toggleBtnInactive,
                )}
                onClick={handleClickIllustrationButton}
              >
                Illustrations
              </button>

              <button
                className={cn(
                  styles.toggleBtn,
                  activeButton === "icons"
                    ? styles.toggleBtnActive
                    : styles.toggleBtnInactive,
                )}
                onClick={handleClickIconButton}
              >
                Iconography
              </button>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {activeData.map((cardData) => (
            <Card
              key={cardData.id}
              name={cardData.name}
              usedIn={cardData.usedIn}
              provider={cardData.provider}
              Image={cardData.Image}
              imgStyleClasses={
                activeButton === "icons"
                  ? styles.cardImageIcon
                  : styles.cardImageIllustration
              }
              imgContainerStyleClasses={
                activeButton === "illustrations"
                  ? styles.cardImageContainerIllustration
                  : styles.cardImageContainerIcon
              }
              learnMoreLink={cardData.link}
            />
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <LogoHfla
            className={styles.hflaLogo}
            aria-label="Hack for LA logo"
          />
          <div className={styles.footerText}>
            <h3 className={styles.joinTitle}>Join us!</h3>
            <p className={styles.joinBody}>
              Civic Tech Jobs is one of the many projects at{" "}
              <a className={styles.link} href="https://www.hackforla.org/">
                Hack for LA
              </a>
              ,<br />
              Code for America's Los Angeles chapter.
            </p>
          </div>
        </div>

        <BottomSvg className={styles.bottomSvg} />
      </div>
    </div>
  );
};

export { CreditsPage };
