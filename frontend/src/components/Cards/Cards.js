import PropTypes from "prop-types";
import React, { useState } from "react";
import * as utility from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";
import "./_Cards.scss";

function CopCard({ openState = false, size = "sm", ...props }) {
  const [isOpen, setIsOpen] = useState(openState);

  return (
    <div
      className={utility.combineClasses(
        "card",
        `cop-card-${size}`,
        props.class,
        isOpen ? undefined : "disabled"
      )}
    >
      <CloseButton
        class={`cop-card-${size}-x`}
        onClick={() => setIsOpen(false)}
      ></CloseButton>
      <div className={`cop-card-${size}-content`}>{props.children}</div>
    </div>
  );
}

function InnerCopCard(props) {
  return (
    <div
      className={utility.combineClasses("card", "inner-cop-card", props.class)}
    >
      <div className="inner-cop-card-content">{props.children}</div>
    </div>
  );
}

// Type declaration for props
CopCard.propTypes = {
  class: PropTypes.string,
  openState: PropTypes.bool,
  size: PropTypes.oneOf(["lg", "sm"]),
};

InnerCopCard.propTypes = {
  class: PropTypes.string,
};

export { CopCard, InnerCopCard };
