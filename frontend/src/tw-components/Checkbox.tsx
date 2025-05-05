import React, { useId, useRef, useState, useEffect } from "react";
import { IconCheckboxY, IconCheckboxN } from "assets/images/images";
import { cn } from "lib/utils";

// Type declaration for props
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
    <div className={cn("relative flex items-center", props.className)}>
      <input
        id={checkboxId}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        ref={checkboxRef}
        onChange={handleChange}
        className="peer sr-only"
      />

      {/* Circle Effect */}
      <span
        className="absolute h-10 w-10 rounded-full opacity-0 peer-focus:bg-blue-dark peer-focus:opacity-[.16] peer-active:bg-blue-dark peer-active:opacity-[.32]"
          "absolute h-10 w-10 rounded-full opacity-0",
          "peer-focus:bg-blue-dark peer-focus:opacity-[.16] peer-active:bg-blue-dark peer-active:opacity-[.32]",
        )}
      ></span>

      {/* Label & Checkbox Icon */}
      <label
        htmlFor={checkboxId}
        className={cn("relative flex cursor-pointer select-none items-center", {
          "opacity-50 cursor-not-allowed": disabled,
        })}
      >
        <span className="relative flex h-10 w-10 items-center justify-center">
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
        <span className={labelHidden ? "sr-only" : "ml-1"}>{props.label}</span>
      </label>
    </div>
  );
}

export { Checkbox };
