// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import * as utility from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";
import "./_Cards.scss";

function CopCard({ hidden = true, size = "sm", ...props }) {
  const [isHidden, setIsHidden] = useState(hidden);

  return (
    <div
      className={utility.combineClasses(
        "card",
        `cop-card-${size}`,
        props.class,
        isHidden ? "hidden" : undefined
      )}
    >
      <CloseButton
        class={`cop-card-${size}-x`}
        onClick={() => setIsHidden(true)}
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

function InnerCopNavCard({ isActive = false, ...props }) {
  const Tag = "href" in props ? "a" : "button"; // conditionally rendered tagss

  return (
    <Tag
      className={utility.combineClasses(
        "card",
        "inner-cop-nav-card",
        isActive ? "active" : undefined,
        props.class
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Tag>
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

InnerCopNavCard.propTypes = {
  class: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export { CopCard, InnerCopCard, InnerCopNavCard };
