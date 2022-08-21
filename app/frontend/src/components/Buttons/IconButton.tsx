// Eternal Imports
import React from "react";

// Internal Imports
import { combineClasses, onKey } from "../Utility/utils";
import { iconX, iconArrowLeft } from "../../assets/images/images";

interface IconButtonProps extends React.PropsWithChildren {
  addClass?: string;
  label: string;
  onClick: (e?: React.SyntheticEvent) => void;
  variant: "X" | "ArrowLeft";
}

const variants = {
  X: iconX,
  ArrowLeft: iconArrowLeft,
};

function IconButton(props: IconButtonProps) {
  return (
    <div
      className={combineClasses("btn-icon", props.addClass)}
      onClick={props.onClick}
      onKeyDown={(e) => onKey(props.onClick, "Enter")(e)}
      role="button"
      aria-label={props.label}
      tabIndex={0}
    >
      <img src={variants[props.variant]} alt="close"></img>
    </div>
  );
}

export { IconButton };
