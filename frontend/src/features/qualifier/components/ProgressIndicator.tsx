import React from "react";

import styles from "./ProgressIndicator.module.css";

interface ProgressIndicatorProps {
  currentPart: number;
  totalParts: number;
  title: string;
  progressPercentage: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentPart,
  totalParts,
  title,
  progressPercentage,
}) => {
  const validProgressPercentage = Math.min(
    Math.max(progressPercentage, 0),
    100,
  );
  const strokeDashoffset = 62.8 - (62.8 * validProgressPercentage) / 100;

  return (
    <div className={styles.root}>
      <svg
        className={styles.svg}
        width="40"
        height="40"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="10"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="4"
        />
        <circle
          cx="18"
          cy="18"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="62.8, 62.8"
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <div className={styles.text}>
        <span className={styles.title}>
          Part {currentPart} of {totalParts}
        </span>
        <span className={styles.subtitle}>{title}</span>
      </div>
    </div>
  );
};
