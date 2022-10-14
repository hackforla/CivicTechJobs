// Eternal Imports
import { iconCheckMark, iconPlus } from "assets/images/images";
import React, { useEffect, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ChipProps {
  addClass?: string;
  isActive?: boolean;
  onChange: (active: boolean, value: string) => any;
  value: string;
}

function Chip({ addClass, isActive = false, onChange, value }: ChipProps) {
  const [on, isOn] = useState(isActive);

  useEffect(() => {
    onChange(on, value);
  }, [on]);

  function handleClick() {
    isOn(!on);
  }

  return (
    <button
      onClick={handleClick}
      className={combineClasses(
        "chip",
        "px-2",
        "paragraph-3",
        on && "active",
        addClass
      )}
    >
      {on ? (
        <img
          src={iconCheckMark}
          alt="Checkmark"
          className="pr-1"
          aria-hidden="true"
        />
      ) : (
        <img
          src={iconPlus}
          alt="Plus sign"
          className="pr-1"
          aria-hidden="true"
        />
      )}
      {value}
    </button>
  );
}

export { Chip };
