// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import "./_Layouts.scss";

function LargeCopCardLayout({ gap = 2, ...props }) {
  return (
    <div className={combineClasses("flex-container", props.class)}>
      <div className={combineClasses("col-3", `mr-${gap}`)}>
        {props.children[0]}
      </div>
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
