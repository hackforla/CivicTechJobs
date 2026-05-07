import React from "react";

import { cn } from "@/shared/lib/utils";

import styles from "./StandardCard.module.css";

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

function Card({ ...props }: CardProps) {
  return (
    <div className={cn(styles.card, props.className)}>{props.children}</div>
  );
}

export { Card };
