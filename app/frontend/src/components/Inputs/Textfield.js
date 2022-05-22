// Eternal Imports
import React, { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function TextField({ labelHidden = false, ...props }) {
  const textFieldId = useId();

  return (
    <div className={combineClasses("flex-column", props.addClass)}>
      <label
        className={combineClasses("title-6", "mb-1", labelHidden && "sr-only")}
        htmlFor={textFieldId}
      >
        {props.label}
      </label>
      <input id={textFieldId} type="text" className="textfield-input" />
    </div>
  );
}

// Type declaration for props
TextField.propTypes = {
  addClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelHidden: PropTypes.bool,
};

export { TextField };
