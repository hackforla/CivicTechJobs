// Eternal Imports
import React, { useId } from "react";
import PropTypes from "prop-types";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Checkbox({ defaultChecked = false, disabled = false, ...props }) {
  const id = useId();

  return (
    <div>
      <input
        className={combineClasses("checkbox", props.addClass)}
        id={id}
        type="checkbox"
        checked={props.checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={props.onChange}
        onClick={props.onClick}
      ></input>
      <label className={combineClasses(!props.label && "hidden")} htmlFor={id}>
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
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export { Checkbox };
