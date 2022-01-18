// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import * as utility from "../Utility/utils";
import "./_Layouts.scss";

function LargeCopCardLayout(props) {
    const numChildren = React.Children.count(children) 
    if (numChildren != 2) {
        console.error(`Children count is ${numChildren < 2 ? "less than" : "greater than"} 2.`)
    }

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
