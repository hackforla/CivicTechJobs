// Eternal Imports
import React, { useId, useLayoutEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { IconCheckboxY, IconCheckboxN } from "assets/images/images";

// Type declaration for props
interface CheckboxProps {
  addClass?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  label: string;
  labelHidden?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

function Checkbox({
  defaultChecked = false,
  disabled = false,
  labelHidden = false,
  ...props
}: CheckboxProps) {
  /* Notes on when to use color
  disabledColor: use this for stroke and fill for Y and stroke only for N
  enabledYColor: use this for stroke and fill for Y
  enabledNColor: use this for stroke only N
  */
  const disabledColor = "#C1C1C1";
  const enabledYColor = "#3450A1";
  const enabledNColor = "#585858";
  const checkboxId = useId();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef(null);

  const [isChecked, setIsChecked] = useState(defaultChecked);

  useLayoutEffect(() => {
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
    <div className={combineClasses("checkbox", props.addClass)}>
      <input
        className={combineClasses("checkbox-input", "sr-only", props.addClass)}
        id={checkboxId}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        ref={checkboxRef}
        onChange={handleChange}
      ></input>
      <label
        className={combineClasses(
          "checkbox-label",
          disabled && "checkbox-disabled"
        )}
        htmlFor={checkboxId}
      >
        <CSSTransition
          in={isChecked}
          classNames="checkbox-icon"
          timeout={300}
          nodeRef={nodeRef}
        >
          <span className="checkbox-icon" ref={nodeRef}>
            {isChecked ? (
              <IconCheckboxY
                height="24"
                width="24"
                fill={disabled ? disabledColor : enabledYColor}
                stroke={disabled ? disabledColor : enabledYColor}
                viewBox="0 0 24 24"
                aria-hidden="true"
              />
            ) : (
              <IconCheckboxN
                height="24"
                width="24"
                fill="#fff"
                stroke={disabled ? disabledColor : enabledNColor}
                viewBox="0 0 24 24"
                aria-hidden="true"
              />
            )}
          </span>
        </CSSTransition>
        <span className={combineClasses(labelHidden && "sr-only")}>
          {props.label}
        </span>
      </label>
    </div>
  );
}

export { Checkbox };
