/**
 * Generic rectangular card primitive.
 *
 * A thin wrapper around a styled `<div>` - lets a consumer pass
 * children and an optional className. No interactive behavior; for
 * clickable cards, wrap the content in a button or use an
 * interactive primitive like `CircleCard` instead.
 */

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
