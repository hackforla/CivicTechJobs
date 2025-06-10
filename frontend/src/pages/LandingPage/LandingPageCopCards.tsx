// External Imports
import React from "react";
import clsx from "clsx";

// Internal Imports
import { IconButton } from "tw-components";
import { iconX } from "assets/images/images";
import { Card } from "tw-components/StandardCard";

interface CopCardProps extends React.PropsWithChildren {
  addClass?: string;
  onClick: (e?: React.SyntheticEvent) => void;
  isHidden?: boolean;
  size?: "lg" | "sm";
}

function CopCard({ isHidden = true, size = "sm", ...props }: CopCardProps) {
  return (
    <Card
      className={clsx(
        "m-2 min-h-[624px] max-w-[1088px] bg-grey-light",
        props.addClass,
        isHidden ? "hidden" : undefined,
      )}
    >
      <IconButton
        className={`cop-card-${size}-x`}
        iconUrl={iconX}
        label="close"
        onClick={props.onClick}
      ></IconButton>
      <div className={`cop-card-${size}-content`}>{props.children}</div>
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
