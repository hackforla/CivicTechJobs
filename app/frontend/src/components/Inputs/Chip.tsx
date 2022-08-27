// Eternal Imports
import { IconX, iconX } from "assets/images/images";
import React from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ChipProps {
  active: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Chip({ active, children, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={combineClasses("chip", active && "active")}
    >
      {active && (
        <IconX
          width="12"
          height="8"
          fill="#fff"
          stroke="#fff"
          viewBox="0 0 12 8"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

export { Chip };
