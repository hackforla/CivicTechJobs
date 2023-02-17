// Eternal Imports
import { iconCheckMark, iconPlus } from "assets/images/images";
import React, { useEffect, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ChipProps {
  addClass?: string;
  checked?: boolean;
  onClick?: (active: boolean, value: string) => any;
  value: string;
  variant?: "single" | "multi";
}

function Chip({
  addClass,
  checked = false,
  onClick,
  value,
  variant = "single",
}: ChipProps) {
  const [active, isActive] = useState(checked);

  useEffect(() => {
    isActive(checked);
  }, [checked]);

  function handleClick() {
    if (onClick) onClick(!active, value);
    isActive(!active);
  }

  function MultiSelectIcon() {
    if (active) {
      return (
        <img
          src={iconCheckMark}
          alt="Checkmark"
          className="pr-1"
          aria-hidden="true"
        />
      );
    } else {
      return (
        <img
          src={iconPlus}
          alt="Plus sign"
          className="pr-1"
          aria-hidden="true"
        />
      );
    }
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
      role="checkbox"
      aria-checked={active}
    >
      {variant == "multi" && <MultiSelectIcon />}
      {value}
    </button>
  );
}

export { Chip };
