// Eternal Imports
import React from "react";

// Internal Imports
import { combineClasses, onKey } from "../Utility/utils";

interface IconButtonProps extends React.PropsWithChildren {
  addClass?: string;
  label: string;
  onClick: (e?: React.SyntheticEvent) => void;
  iconUrl: string;
}

function IconButton(props: IconButtonProps) {
  return (
    <div
      className={combineClasses("icon-btn", props.addClass)}
      onClick={props.onClick}
      onKeyDown={(e) => onKey(props.onClick, "Enter")(e)}
      role="button"
      aria-label={props.label}
      tabIndex={0}
    >
      <img src={props.iconUrl} alt=""></img>
    </div>
  );
}

export { IconButton };
