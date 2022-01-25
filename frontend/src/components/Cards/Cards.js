// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";
import "./_Cards.scss";

function CopCard({ hidden = true, size = "sm", ...props }) {
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
      <div className="row justify-right">
        <CloseButton
          addClass={combineClasses(`cop-card-${size}-x`, "self-x-right")}
          onClick={() => (props.onClick ? props.onClick() : setIsHidden(true))}
        ></CloseButton>
      </div>
      <div className="row">{props.children}</div>
    </div>
  );
}

CopCard.propTypes = {
  addClass: PropTypes.string,
  onClick: PropTypes.func,
  openState: PropTypes.bool,
  size: PropTypes.oneOf(["lg", "sm"]),
};

function InnerCopCard(props) {
  return (
    <div className={combineClasses("card", "inner-cop-card", props.addClass)}>
      {props.children}
    </div>
  );
}

InnerCopCard.propTypes = {
  addClass: PropTypes.string,
};

function InnerCopNavCard({ isActive = false, ...props }) {
  const Tag = "href" in props ? "a" : "button"; // conditionally rendered tagss

  return (
    <Tag
      className={combineClasses(
        "card",
        "inner-cop-nav-card",
        isActive ? "active" : undefined,
        props.addClass
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Tag>
  );
}

InnerCopNavCard.propTypes = {
  addClass: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export { CopCard, InnerCopCard, InnerCopNavCard };
