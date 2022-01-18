// Eternal Imports
import React from "react";
import PropTypes from "prop-types";

// Internal Imports
import * as utility from "../Utility/utils";
import { iconX } from "../../assets/images/images";
import "./_CloseButton.scss";

function CloseButton(props) {
  return (
    <img
      src={iconX}
      onClick={props.onClick}
      className={utility.combineClasses("btn-close", props.class)}
    ></img>
  );
}

// Type declaration for props
CloseButton.propTypes = {
  class: PropTypes.string,
  onClick: PropTypes.func,
};

export { CloseButton };
