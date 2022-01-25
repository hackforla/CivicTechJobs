// Eternal Imports
import React from "react";
import PropTypes from "prop-types";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { iconX } from "../../assets/images/images";
import "./_CloseButton.scss";

function CloseButton(props) {
  return (
    <img
      src={iconX}
      onClick={props.onClick}
      className={combineClasses("btn-close", props.addClass)}
    ></img>
  );
}

// Type declaration for props
CloseButton.propTypes = {
  addClass: PropTypes.string,
  onClick: PropTypes.func,
};

export { CloseButton };
