"use client";

import React from "react";

import { IconButton } from "@/shared/components/Buttons";
import { Card } from "@/shared/components/StandardCard";
import IconX from "@/shared/icons/icon-x.svg";
import { cn } from "@/shared/lib/utils";

import styles from "./LandingPageCopCards.module.css";

interface CopCardProps extends React.PropsWithChildren {
  addClass?: string;
  onClick: (e?: React.SyntheticEvent) => void;
  isHidden?: boolean;
  size?: "lg" | "sm";
}

const copCardSize = {
  lg: { card: styles.copCardLg, content: styles.contentLg },
  sm: { card: styles.copCardSm, content: styles.contentSm },
} as const;

function CopCard({ isHidden = true, size = "sm", ...props }: CopCardProps) {
  return (
    <Card
      className={cn(
        copCardSize[size].card,
        props.addClass,
        isHidden && styles.hidden,
      )}
    >
      <div className={styles.closeRow}>
        <IconButton Icon={IconX} label="close" onClick={props.onClick} />
      </div>
      <div className={copCardSize[size].content}>{props.children}</div>
    </Card>
  );
}

interface InnerCopCardProps extends React.PropsWithChildren {
  addClass?: string;
}

function InnerCopCard(props: InnerCopCardProps) {
  return (
    <Card className={cn(styles.innerCard, props.addClass)}>
      <div className={styles.innerCardInner}>{props.children}</div>
    </Card>
  );
}

interface InnerCopNavCardSharedProps extends React.PropsWithChildren {
  className?: string;
  isActive?: boolean;
}

interface InnerCopNavCardAnchorProps extends InnerCopNavCardSharedProps {
  href: string;
  onClick?: never;
}

interface InnerCopNavCardButtonProps extends InnerCopNavCardSharedProps {
  href?: never;
  onClick: () => void;
}

type InnerCopNavCardProps =
  | InnerCopNavCardAnchorProps
  | InnerCopNavCardButtonProps;

function InnerCopNavCard({ isActive = false, ...props }: InnerCopNavCardProps) {
  return (
    <button
      className={cn(
        styles.navCard,
        isActive && styles.navCardActive,
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export { CopCard, InnerCopCard, InnerCopNavCard };
