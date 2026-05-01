"use client";

import React, { useEffect, useState } from "react";

import IconCheckMark from "@/shared/icons/icon-checkmark.svg";
import IconPlus from "@/shared/icons/icon-plus.svg";
import { combineClasses } from "@/shared/lib/utils";

interface ChipProps {
  addClass?: string;
  checked?: boolean;
  onClick?: (active: boolean, value: string) => unknown;
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
      return <IconCheckMark className="pr-1" aria-hidden="true" />;
    }
    return <IconPlus className="pr-1" aria-hidden="true" />;
  }

  return (
    <button
      onClick={handleClick}
      className={combineClasses(
        `${variant}-chip`,
        "px-4",
        "paragraph-3",
        active && "active",
        addClass,
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
