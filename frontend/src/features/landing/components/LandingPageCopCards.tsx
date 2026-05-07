"use client";

import React from "react";
import clsx from "clsx";

import { IconButton } from "@/shared/components/Buttons";
import IconX from "@/shared/icons/icon-x.svg";
import { Card } from "@/shared/components/StandardCard";

interface CopCardProps extends React.PropsWithChildren {
  addClass?: string;
  onClick: (e?: React.SyntheticEvent) => void;
  isHidden?: boolean;
  size?: "lg" | "sm";
}

const copCardSize = {
  lg: {
    card: "min-h-[624px] max-w-[1088px]",
    content: "pt-14 pb-10 pl-[3.4vw] pr-[7.6vw]",
  },
  sm: {
    card: "min-h-[600px] max-w-[312px]",
    content: "pt-[74px] px-[6.4vw]",
  },
} as const;

function CopCard({ isHidden = true, size = "sm", ...props }: CopCardProps) {
  return (
    <Card
      className={clsx(
        "m-2 bg-grey-light",
        copCardSize[size].card,
        props.addClass,
        isHidden ? "hidden" : undefined,
      )}
    >
      <div className="flex justify-end">
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
    <Card
      className={clsx(
        "h-full min-h-[448px] max-w-[625px] bg-white",
        props.addClass,
      )}
    >
      <div className="box-border flex h-full flex-col justify-between px-[0.6vw] py-2">
        {props.children}
      </div>
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
      className={clsx(
        "min-h-16 max-w-[188px] rounded-2xl border-0 hover:underline",
        isActive ? "bg-blue-dark text-white" : "bg-white",
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export { CopCard, InnerCopCard, InnerCopNavCard };
