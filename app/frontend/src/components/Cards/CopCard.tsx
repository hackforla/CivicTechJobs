// External Imports
import React, { useState, useEffect } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { IconButton } from "../Buttons/IconButton";
import { iconX } from "assets/images/images";

interface CopCardProps extends React.PropsWithChildren {
  addClass?: string;
  onClick: (e?: React.SyntheticEvent) => void;
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
      <IconButton
        addClass={`cop-card-${size}-x`}
        iconUrl={iconX}
        label="close"
        onClick={props.onClick}
      ></IconButton>
      <div className={`cop-card-${size}-content`}>{props.children}</div>
    </div>
  );
}

interface InnerCopCardProps extends React.PropsWithChildren {
  addClass?: string;
}

export { CopCard };
