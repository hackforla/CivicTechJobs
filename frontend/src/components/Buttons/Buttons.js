// External Imports
import PropTypes from "prop-types";
import React from "react";

// Internal Imports
import "./_Buttons.scss";

// Default button size/colour/variant is small/primary/base
function Button({
  size = "sm",
  color = "primary",
  length = "", // empty string is falsy
  ...props
}) {
  const Tag = "href" in props ? "a" : "button"; // conditionally rendered tags

  return (
    <Tag
      className={combineClasses(
        "btn",
        `btn-${size}`,
        `btn-${color}`,
        length && `btn-${size}-${length}`,
        props.disabled && "disabled",
        props.class
      )}
      href={props.href}
      target={props.href ? props.target : null}
      onClick={() => props.onClick}
    >
      {props.children}
    </Tag>
  );
}

// Type declaration for props
Button.propTypes = {
  class: PropTypes.string,
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

/**
 * Takes an array of different and combine them into one string to be placed in an element's class attribute.
 * @param  {...any} args an array of anything
 * @returns a joined string after filtering out non-strings from args
 */
function combineClasses(...args) {
  return args.filter((x) => typeof x === "string").join(" ");
}

export { Button };
