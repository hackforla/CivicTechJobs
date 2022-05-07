// External Imports
import PropTypes from "prop-types";
import React from "react";

// Internal Imports
import { combineClasses, onEnterKey } from "../Utility/utils";

function CircleCard({ size = "sm", ...props }) {
  return (
    <div
      className={combineClasses(
        "circle-card",
        `circle-card-${size}`,
        props.onClick && "circle-card-button",
        props.addClass
      )}
      onClick={props.onClick}
      onKeyDown={onEnterKey(props.onClick)}
      role={props.role}
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
  role: PropTypes.string,
  size: PropTypes.oneOf(["lg", "sm"]),
};

export { CircleCard };
