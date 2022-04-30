// Eternal Imports
import React from "react";
import PropTypes from "prop-types";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { iconX } from "../../assets/images/images";

function CloseButton(props) {
  return (
    <div
      className={combineClasses("btn-close", props.addClass)}
      onClick={props.onClick}
      role="button"
      type="button"
      aria-label="close"
    >
      <img src={iconX} alt="close"></img>
    </div>
  );
}

// Type declaration for props
CloseButton.propTypes = {
  addClass: PropTypes.string,
  onClick: PropTypes.func,
};

export { CloseButton };
