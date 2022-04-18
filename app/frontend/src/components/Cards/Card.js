// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";

function Card({ hidden = true, size = "sm", ...props }) {
  const [isHidden, setIsHidden] = useState(hidden);

  return (
    <div
      className={combineClasses(
        "card",
        `cop-card-${size}`,
        props.addClass,
        isHidden ? "hidden" : undefined
      )}
    >
      <CloseButton
        addClass={`cop-card-${size}-x`}
        onClick={() => (props.onClick ? props.onClick() : setIsHidden(true))}
      ></CloseButton>
      <div className={`cop-card-${size}-content`}>{props.children}</div>
    </div>
  );
}

Card.propTypes = {
  addClass: PropTypes.string,
  onClick: PropTypes.func,
  openState: PropTypes.bool,
  size: PropTypes.oneOf(["lg", "sm"]),
};

export { Card };
