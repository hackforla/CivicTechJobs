import PropTypes from "prop-types";
import React from "react";
import "./_Buttons.scss";

function Button({ size = "sm", color = "primary", ...props }) {
  const Tag = "href" in props ? "a" : "button";

  return (
    <Tag
      className={combineClasses(
        `btn-${size}`,
        `btn-${color}`,
        props.disabled && "disabled",
        props.class
      )}
      href={props.href}
    >
      {props.children}
    </Tag>
  );
}

Button.propTypes = {
  class: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary"]),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
    "icon",
    "sm-long",
    "md-long",
    "lg-long",
  ]),
};

function combineClasses(...args) {
  let classes = [];
  for (const arg of args) {
    if (arg) {
      classes.push(arg);
    }
  }

  return classes.join(" ");
}

export { Button };
