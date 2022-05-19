// Eternal Imports
import React, { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";

// Internal Imports
import { combineClasses } from "../Utility/utils";
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
  const id = useId();
  const checkboxRef = useRef();
  const [isChecked, setIsChecked] = useState();

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  function handleChange(e) {
    console.log("changed now, did you clcik the svg");
    setIsChecked(e.target.checked);
    if (props.onChange) {
      props.onChange(e);
    }
  }

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
      className={combineClasses(
        "flex-container align-center checkbox",
        props.addClass
      )}
      onClick={handleClick}
    >
      <input
        className={combineClasses("", props.addClass)}
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        ref={checkboxRef}
      ></input>
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
          stroke={disabled ? disabledColor : enabledNColor}
          viewBox="0 0 24 24"
        />
      )}
      <label
        className={combineClasses(props.labelHidden && "hidden")}
        htmlFor={id}
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
