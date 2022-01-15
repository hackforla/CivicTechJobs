import React from "react";
import PropTypes from "prop-types";
import * as utility from "../Utility/utils";
import { IconX } from "../../assets/images/images";
import "./_CloseButton.scss";

function CloseButton(props) {
  return (
    <img
      src={IconX}
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
