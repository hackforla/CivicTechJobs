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
