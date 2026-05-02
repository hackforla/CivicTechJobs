"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { type copDatum } from "@/shared/data/copData";
import Typography from "@/shared/components/Typography";
import { Button } from "@/shared/components/Buttons";
import IconCheckMark from "@/shared/icons/icon-checkmark.svg";
import { QualifierNav } from "./QualifierNav";
import { useQualifiersContext } from "../QualifiersContext";
import { cn } from "@/shared/lib/utils";
import styles from "./QualifierPage1.module.css";

function QualifierPage1() {
  const router = useRouter();
  const { copData, qualifiers, updateQualifiers } = useQualifiersContext();

  const handleSelectCOP = (
    e: React.MouseEvent<HTMLDivElement>,
    cop: copDatum,
  ) => {
    e.stopPropagation();
    updateQualifiers({ ...qualifiers, selectedCOP: cop.title });
  };

  return (
    <div className={styles.page}>
      <Typography.Title2 className={styles.title}>
        What type of Practice Area are you looking for?
      </Typography.Title2>
      <Typography.Paragraph3 className={styles.subtitle}>
        Select one practice area
      </Typography.Paragraph3>
      <div className={styles.content}>
        <div className={styles.grid}>
          {copData.map((cop) => {
            const isSelected = qualifiers.selectedCOP === cop.title;
            return (
              <div
                key={cop.id}
                className={cn(styles.card, isSelected && styles.cardSelected)}
                onClick={(e) => handleSelectCOP(e, cop)}
                role="button"
                tabIndex={0}
              >
                <div
                  className={cn(
                    styles.iconBubble,
                    isSelected && styles.iconBubbleSelected,
                  )}
                >
                  <cop.icon strokeWidth="0.2" height="25" aria-hidden="true" />
                </div>
                <Typography.Title3 className={styles.cardTitle}>
                  {cop.title}
                </Typography.Title3>
                <Typography.Paragraph5 className={styles.cardSubtitle}>
                  {cop.subtitle}
                </Typography.Paragraph5>
              </div>
            );
          })}
        </div>
        <QualifierNav
          className={cn(styles.nav, !qualifiers.selectedCOP && styles.navHidden)}
        >
          <div className={styles.statusRow}>
            <div className={styles.statusBadge}>
              <IconCheckMark height="12" width="12" aria-hidden="true" />
            </div>
            <Typography.Paragraph3 className={styles.statusText}>
              Practice Area: Complete
            </Typography.Paragraph3>
          </div>
          <Button size="medium" onClick={() => router.push("/qualifier/2")}>
            Continue
          </Button>
        </QualifierNav>
      </div>
    </div>
  );
}

export { QualifierPage1 };
