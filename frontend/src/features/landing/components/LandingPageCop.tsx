"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/shared/components/Buttons";
import { CircleCard } from "@/shared/components/CircleCard";
import Dialog from "@/shared/components/Dialog";
import Typography from "@/shared/components/Typography";
import {
  type copDatum,
  fetchAllCopData,
  fetchCopDataById,
} from "@/shared/data/copData";

import styles from "./LandingPageCop.module.css";
import { CopCard, InnerCopCard, InnerCopNavCard } from "./LandingPageCopCards";

function LandingPageCop() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copData, setCopData] = useState<copDatum[]>([]);
  const [currentDatum, setCurrentDatum] = useState<copDatum | null>(null);

  useEffect(() => {
    setCopData(fetchAllCopData());
  }, []);

  function handleCopData(id: number) {
    const datum = fetchCopDataById(id);
    if (datum) setCurrentDatum(datum);
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Communities of Practice (COP)</h2>
      <div className={styles.intro}>
        A Community of Practice (CoP) is a group of volunteers who share a
        common interest in a topic and meet regularly to fulfill both individual
        and group goals. We use CoPs to share effective practices and relevant
        domain knowledge to help our members grow.
      </div>
      <div className={styles.circles}>
        {copData.map((cop) => (
          <CircleCard
            key={cop.id}
            size="lg"
            className={styles.circleCard}
            onClick={() => {
              handleCopData(cop.id);
              setIsDialogOpen(true);
            }}
            role="button"
          >
            <div className={styles.circleInner}>
              <div className={styles.iconRow}>
                <cop.icon strokeWidth="0.2" height="65" aria-hidden="true" />
              </div>
              <div className={styles.titleWrap}>
                <Typography.Title4>{cop.title}</Typography.Title4>
              </div>
            </div>
          </CircleCard>
        ))}
      </div>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className={styles.dialogContent}
        ariaLabel="Communities of Practice (COP)"
      >
        <CopCard
          isHidden={false}
          size="lg"
          onClick={() => setIsDialogOpen(false)}
        >
          <div className={styles.cardLayout}>
            <nav className={styles.nav}>
              {copData.map((cop) => {
                const isActive = cop.id === currentDatum?.id;
                return (
                  <InnerCopNavCard
                    key={cop.id}
                    isActive={isActive}
                    onClick={() => handleCopData(cop.id)}
                    className={styles.navItem}
                  >
                    <div className={styles.iconCell}>
                      <cop.icon
                        fill={isActive ? "white" : "black"}
                        stroke={isActive ? "white" : "black"}
                        strokeWidth="0.2"
                        height="24"
                        width="24"
                        aria-hidden="true"
                      />
                    </div>
                    <span className={styles.navItemText}>{cop.title}</span>
                  </InnerCopNavCard>
                );
              })}
            </nav>
            <div className={styles.contentColumn}>
              <InnerCopCard>
                <div>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconCell}>
                      {currentDatum?.icon && (
                        <currentDatum.icon
                          fill="black"
                          stroke="black"
                          strokeWidth="0.2"
                          height="50"
                          width="50"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {currentDatum?.title} CoP
                  </div>
                  {currentDatum?.description}
                </div>
                <div>
                  <div className={styles.joinWrap}>
                    <Button size="medium-long" href="/qualifier/1">
                      Join Us
                    </Button>
                  </div>
                </div>
              </InnerCopCard>
            </div>
          </div>
        </CopCard>
      </Dialog>
    </div>
  );
}

export { LandingPageCop };
