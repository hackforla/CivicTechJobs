"use client";

import React from "react";
import { cn, onKey } from "@/shared/lib/utils";
import styles from "./CircleCard.module.css";

interface CircleCardProps extends React.PropsWithChildren {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: string;
  size?: "lg" | "sm";
}

const cardSizes = {
  sm: styles.sizeSm,
  lg: styles.sizeLg,
};

function CircleCard({ size = "sm", ...props }: CircleCardProps) {
  return (
    <div
      className={cn(
        styles.card,
        cardSizes[size],
        props.onClick && styles.interactive,
        props.className,
      )}
      onClick={props.onClick}
      onKeyDown={props.onClick && onKey(props.onClick, "Enter")}
      role={props.role}
    >
      <div className={styles.inner}>{props.children}</div>
    </div>
  );
}

export { CircleCard };
