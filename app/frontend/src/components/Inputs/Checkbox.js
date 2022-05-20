// Eternal Imports
import React, { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

// Internal Imports
import { combineClasses, onKey } from "../Utility/utils";
import { IconCheckboxY, IconCheckboxN } from "assets/images/images";

function Checkbox({
  defaultChecked = false,
  disabled = false,
  labelHidden = false,
  ...props
}) {
  /* Notes on when to use color
  disabledColor: use this for stroke and fill for Y and stroke only for N
  enabledYColor: use this for stroke and fill for Y
  enabledNColor: use this for stroke only N
  */
  const disabledColor = "#C1C1C1";
  const enabledYColor = "#3450A1";
  const enabledNColor = "#585858";
  const checkboxId = useId();
  const iconId = useId();
  const checkboxRef = useRef(null);
  const nodeRef = useRef(null);

  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    checkboxRef.current.checked = isChecked;
    if (props.onChange) {
      props.onChange(e);
    }
  }, [isChecked]);

  function handleClick(e) {
    if (!disabled) {
      setIsChecked(!isChecked);
    }
    if (props.onClick) {
      props.onClick(e);
    }
  }

  return (
    <div
      className={combineClasses("checkbox", props.addClass)}
      onClick={handleClick}
      onKeyDown={onKey(handleClick, "Enter")}
      //TODO set a role but not checkbox, since it is a bit of a misnomer, and this should not be tabable
    >
      <input
        className={combineClasses("checkbox-input", "hidden", props.addClass)}
        id={checkboxId}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        ref={checkboxRef}
      ></input>
      <CSSTransition
        in={isChecked}
        classNames="checkbox-icon"
        timeout={300}
        nodeRef={nodeRef}
      >
        <span
          className={combineClasses(
            "checkbox-icon",
            disabled && "checkbox-disabled"
          )}
          ref={nodeRef}
          role="checkbox"
          tabIndex="0"
          aria-checked={isChecked ? "true" : "false"}
          aria-labelledby={iconId}
        >
          {isChecked ? (
            <IconCheckboxY
              height="24"
              width="24"
              fill={disabled ? disabledColor : enabledYColor}
              stroke={disabled ? disabledColor : enabledYColor}
              viewBox="0 0 24 24"
            />
          ) : (
            <IconCheckboxN
              height="24"
              width="24"
              fill="#fff"
              stroke={disabled ? disabledColor : enabledNColor}
              viewBox="0 0 24 24"
            />
          )}
        </span>
      </CSSTransition>
      <label
        className={combineClasses(props.labelHidden && "hidden")}
        htmlFor={checkboxId}
        id={iconId}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {" "}
        {props.label}
      </label>
    </div>
  );
}

// Type declaration for props
Checkbox.propTypes = {
  addClass: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelHidden: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export { Checkbox };
