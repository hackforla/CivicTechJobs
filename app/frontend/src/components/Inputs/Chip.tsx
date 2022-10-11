// Eternal Imports
import { iconCheckMark, iconPlus } from "assets/images/images";
import React, { useEffect, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ChipProps {
  addClass?: string;
  onChange: (active: boolean, value: string) => any;
  value: string;
}

function Chip({ addClass, onChange, value }: ChipProps) {
  const [active, isActive] = useState(false);

  useEffect(() => {
    onChange(active, value);
  }, [active]);

  function handleClick() {
    isActive(!active);
  }

  return (
    <button
      onClick={handleClick}
      className={combineClasses(
        "chip",
        "px-2",
        "paragraph-3",
        active && "active",
        addClass
      )}
    >
      {active ? (
        <img src={iconCheckMark} className="pr-1" aria-hidden="true" />
      ) : (
        <img src={iconPlus} className="pr-1" aria-hidden="true" />
      )}
      {value}
    </button>
  );
}

export { Chip };
