"use client";

import React, { useEffect, useState } from "react";

import IconCheckMark from "@/shared/icons/icon-checkmark.svg";
import IconPlus from "@/shared/icons/icon-plus.svg";
import { cn } from "@/shared/lib/utils";
import styles from "./Chip.module.css";

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
      return <IconCheckMark className={styles.iconLeading} aria-hidden="true" />;
    }
    return <IconPlus className={styles.iconLeading} aria-hidden="true" />;
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        variant === "multi" ? styles.multi : styles.single,
        active && styles.active,
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
