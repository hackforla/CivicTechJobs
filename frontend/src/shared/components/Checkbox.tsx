"use client";

import React, { useId, useRef, useState, useEffect } from "react";
import IconCheckboxY from "@/shared/icons/icon-checkbox-yes.svg";
import IconCheckboxN from "@/shared/icons/icon-checkbox-no.svg";
import { cn } from "@/shared/lib/utils";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  label: string;
  labelHidden?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({
  defaultChecked = false,
  disabled = false,
  labelHidden = false,
  ...props
}: CheckboxProps) {
  const checkboxId = useId();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = isChecked;
    }
  }, [isChecked]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!disabled) {
      setIsChecked(e.target.checked);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <div className={cn(styles.root, props.className)}>
      <input
        id={checkboxId}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        ref={checkboxRef}
        onChange={handleChange}
        className={styles.input}
        suppressHydrationWarning
      />

      <span className={styles.circleEffect}></span>

      <label
        htmlFor={checkboxId}
        className={cn(
          styles.label,
          disabled ? styles.labelDisabled : styles.labelEnabled,
        )}
      >
        <span className={styles.iconWrapper}>
          {isChecked ? (
            <IconCheckboxY
              height="24"
              width="24"
              fill={disabled ? "#C1C1C1" : "#3450A1"}
              stroke={disabled ? "#C1C1C1" : "#3450A1"}
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          ) : (
            <IconCheckboxN
              height="24"
              width="24"
              fill="#fff"
              stroke={disabled ? "#C1C1C1" : "#585858"}
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          )}
        </span>
        <span className={labelHidden ? styles.textHidden : styles.text}>
          {props.label}
        </span>
      </label>
    </div>
  );
}

export { Checkbox };
