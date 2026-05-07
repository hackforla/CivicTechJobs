/**
 * Bottom navigation bar shared by all qualifier step components.
 *
 * Provides the layout container; consumers pass back/next buttons
 * (or other actions) as children. Pinned to the bottom of the
 * step content via CSS so each step has consistent footer
 * placement.
 */

import React from "react";

import { cn } from "@/shared/lib/utils";

import styles from "./QualifierNav.module.css";

interface QualifierNavProps {
  className?: string;
  children?: React.ReactNode;
}

function QualifierNav({ className, children }: QualifierNavProps) {
  return (
    <div className={cn(styles.nav, className)}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export { QualifierNav };
