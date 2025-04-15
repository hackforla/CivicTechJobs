import React, { useId, useRef, useState, useEffect } from "react";
import { IconCheckboxY, IconCheckboxN } from "assets/images/images";
import clsx from "clsx";

// Type declaration for props
interface CheckboxProps {
  additionalClass?: string;
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
    <div className={clsx("relative flex items-center", props.additionalClass)}>
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
        className={clsx(
          "absolute h-10 w-10 rounded-full opacity-0",
          "peer-focus:bg-blue-dark peer-focus:opacity-[.16] peer-active:bg-blue-dark peer-active:opacity-[.32]",
          { hidden: disabled }, // no effect when disabled
        )}
      ></span>

      {/* Label & Checkbox Icon */}
      <label
        htmlFor={checkboxId}
        className={clsx(
          "relative flex cursor-pointer select-none items-center",
          { "opacity-50 cursor-not-allowed": disabled },
        )}
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
        <span
          className={clsx({ "sr-only": labelHidden, "ml-1": !labelHidden })}
        >
          {props.label}
        </span>
      </label>
    </div>
  );
}

export default Checkbox;
