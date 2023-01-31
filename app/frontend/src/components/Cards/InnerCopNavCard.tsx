import { combineClasses } from "../Utility/utils";

import React from "react";
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
        props.addClass
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Tag>
  );
}

export { InnerCopNavCard };
