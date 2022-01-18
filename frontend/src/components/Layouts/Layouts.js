// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import * as utility from "../Utility/utils";
import "./_Layouts.scss";

function LargeCopCardLayout(props) {

  return (
    <div className="flex-container">
      <div className="col-3">{props.children[0]}</div>
      <div className="col-9">{props.children[1]}</div>
    </div>
  );
}

LargeCopCardLayout.propTypes = {
  class: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export { LargeCopCardLayout };
