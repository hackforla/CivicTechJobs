// External Imports
import PropTypes from "prop-types";
import React from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Modal({ size = "sm", color = "primary", length = "", ...props }) {
  const Tag = "href" in props ? "a" : "button";
  return (
    <Tag
      className={combineClasses(
        "btn",
        `btn-${size}`,
        `btn-${color}`,
        length && `btn-${size}-${length}`,
        props.disabled && "disabled",
        props.addClass
      )}
      href={props.href}
      target={props.href ? props.target : null}
      onClick={props.onClick}
    >
      {props.children}
    </Tag>
  );
}

// Type declaration for props
Modal.propTypes = {
  addClass: PropTypes.string,
  color: PropTypes.oneOf(["primary", "primary-dark"]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  length: PropTypes.oneOf(["", "long"]),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg", "icon"]),
  target: PropTypes.oneOf([
    "_blank",
    "_self",
    "_parent",
    "_top",
    PropTypes.string,
  ]),
};

export { Modal };
