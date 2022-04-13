// External Imports
import PropTypes from "prop-types";
import React from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function CircleCard({ size = "sm", ...props }) {
  return (
    <div
      className={combineClasses(
        "circle-card",
        `circle-card-${size}`,
        props.addClass
      )}
      onClick={props.onClick}
    >
      <div className={`circle-card-content align-center justify-center`}>
        {props.children}
      </div>
    </div>
  );
}

CircleCard.propTypes = {
  addClass: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["lg", "sm"]),
};

export { CircleCard };
