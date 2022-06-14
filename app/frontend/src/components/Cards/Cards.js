// External Imports
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import "./_Cards.scss";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";

function CopCard({ hidden = true, size = "sm", ...props }) {
  const [isHidden, setIsHidden] = useState(hidden);

  useEffect(() => {
    setIsHidden(hidden);
  }, [isHidden]);

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
        onClick={props.onClick}
      ></CloseButton>
      <div className={`cop-card-${size}-content`}>{props.children}</div>
    </div>
  );
}

CopCard.propTypes = {
  addClass: PropTypes.string,
  onClick: PropTypes.func,
  openState: PropTypes.bool,
  size: PropTypes.oneOf(["lg", "sm"]),
};

export default CopCard;
