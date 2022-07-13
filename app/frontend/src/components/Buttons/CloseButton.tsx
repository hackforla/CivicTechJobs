// Eternal Imports
import React from "react";

// Internal Imports
import { combineClasses, onKey } from "../Utility/utils";
import { iconX } from "../../assets/images/images";

interface CloseButtonProps extends React.PropsWithChildren {
  addClass?: string;
  onClick: (e?: React.SyntheticEvent) => void;
}

function CloseButton(props: CloseButtonProps) {
  return (
    <div
      className={combineClasses("btn-close", props.addClass)}
      onClick={props.onClick}
      onKeyDown={(e) => onKey(props.onClick, "Enter")(e)}
      role="button"
      aria-label="close"
      tabIndex={0}
    >
      <img src={iconX} alt="close"></img>
    </div>
  );
}

export { CloseButton };
