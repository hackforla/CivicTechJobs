// External Imports
import PropTypes from "prop-types";
import React from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function InnerCopCard(props) {
  return (
    <div className={combineClasses("card", "inner-cop-card", props.addClass)}>
      <div className="inner-cop-card-content">{props.children}</div>
    </div>
  );
}

export { InnerCopCard };
