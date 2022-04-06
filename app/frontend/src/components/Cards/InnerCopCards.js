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

export { InnerCopCard, InnerCopNavCard };
