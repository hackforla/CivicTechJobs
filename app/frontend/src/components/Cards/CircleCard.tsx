// External Imports
import React from "react";

// Internal Imports
import { combineClasses, onKey } from "../Utility/utils";

interface CircleCardProps extends React.PropsWithChildren {
  addClass?: string;
  onClick?: () => void;
  role?: string;
  size?: "lg" | "sm";
}

function CircleCard({ size = "sm", ...props }: CircleCardProps) {
  return (
    <div
      className={combineClasses(
        "circle-card",
        `circle-card-${size}`,
        props.onClick && "circle-card-button",
        props.addClass
      )}
      onClick={props.onClick}
      onKeyDown={props.onClick && onKey(props.onClick, "Enter")}
      role={props.role}
    >
      <div className={`circle-card-content align-center justify-center`}>
        {props.children}
      </div>
    </div>
  );
}

export { CircleCard };
