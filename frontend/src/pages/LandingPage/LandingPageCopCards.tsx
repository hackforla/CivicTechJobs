// External Imports
import React from "react";
import clsx from "clsx";

// Internal Imports
import { combineClasses } from "components/Utility/utils";
import { IconButton } from "components/Buttons/IconButton";
import { Card } from "tw-components/Card";
import { iconX } from "assets/images/images";

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
        "m-2 min-h-[624px] max-w-screen-lg bg-grey-light",
        props.addClass,
        isHidden ? "hidden" : undefined,
      )}
    >
      <IconButton
        addClass={`cop-card-${size}-x`}
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
    <Card className={clsx("inner-cop-card", props.addClass)}>
      <div className="inner-cop-card-content">{props.children}</div>
    </Card>
  );
}

interface InnerCopNavCardSharedProps extends React.PropsWithChildren {
  addClass?: string;
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
  const Tag = "href" in props ? "a" : "button"; // conditionally rendered tagss

  return (
    <Tag
      className={combineClasses(
        "inner-cop-nav-card",
        isActive ? "active" : undefined,
        props.addClass,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Tag>
  );
}

export { CopCard, InnerCopCard, InnerCopNavCard };
