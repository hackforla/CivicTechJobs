// Eternal Imports
import React, { useId } from "react";
import PropTypes from "prop-types";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function TextField({ labelHidden = false, iconPosition = "left", ...props }) {
  const textFieldId = useId();

  return (
    <div className={combineClasses("flex-column", props.addClass)}>
      <label
        className={combineClasses("title-6", "mb-1", labelHidden && "sr-only")}
        htmlFor={textFieldId}
      >
        {props.label}
      </label>
      <div className="flex-container align-center">
        {iconPosition == "left" && props.icon && (
          <span className={`textfield-icon-${iconPosition}`}>
            <props.icon />
          </span>
        )}
        <input
          id={textFieldId}
          type="text"
          className={`textfield-input textfield-input-${
            iconPosition == "left" ? "right" : "left"
          }`}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
        {iconPosition == "right" && props.icon && (
          <span className={`textfield-icon-${iconPosition}`}>
            <props.icon />
          </span>
        )}
      </div>
    </div>
  );
}

// Type declaration for props
TextField.propTypes = {
  addClass: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  label: PropTypes.string.isRequired,
  labelHidden: PropTypes.bool,
  onChange: PropTypes.func,
};

export { TextField };
