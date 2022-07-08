// External Imports
import React, { useState, useEffect } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";

interface CopCardProps extends React.PropsWithChildren {
  addClass?: string;
  onClick: () => void;
  hidden?: boolean;
  size?: "lg" | "sm";
}

function CopCard({ hidden = true, size = "sm", ...props }: CopCardProps) {
  const [isHidden, setIsHidden] = useState(hidden);

  useEffect(() => {
    setIsHidden(hidden);
  }, [isHidden]);

  return (
    <div
      className={combineClasses(
        "card",
        `cop-card-${size}`,
        props.addClass,
        isHidden ? "hidden" : undefined
      )}
    >
      <CloseButton
        addClass={`cop-card-${size}-x`}
        onClick={props.onClick}
      ></CloseButton>
      <div className={`cop-card-${size}-content`}>{props.children}</div>
    </div>
  );
}

interface InnerCopCardProps extends React.PropsWithChildren {
  addClass?: string;
}

function InnerCopCard(props: InnerCopCardProps) {
  return (
    <div className={combineClasses("card", "inner-cop-card", props.addClass)}>
      <div className="inner-cop-card-content">{props.children}</div>
    </div>
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
        "card",
        "inner-cop-nav-card",
        isActive ? "active" : undefined,
        props.addClass
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Tag>
  );
}

export { CopCard, InnerCopCard, InnerCopNavCard };
