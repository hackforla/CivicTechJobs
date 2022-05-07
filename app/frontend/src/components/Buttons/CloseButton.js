// Eternal Imports
import React from "react";
import PropTypes from "prop-types";

// Internal Imports
import { combineClasses, onKey } from "../Utility/utils";
import { iconX } from "../../assets/images/images";

function CloseButton(props) {
  return (
    <div
      className={combineClasses("btn-close", props.addClass)}
      onClick={props.onClick}
      onKeyDown={onKey(props.onClick, "Enter")}
      role="button"
      type="button"
      aria-label="close"
      tabIndex="0"
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
