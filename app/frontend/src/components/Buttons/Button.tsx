// External Imports
import React from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ButtonProps extends React.PropsWithChildren {
  addClass: string;
  color: "primary" | "primary-dark";
  disabled: boolean;
  href: string;
  length: "" | "long";
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  size: "sm" | "md" | "lg" | "icon";
  target: "_blank" | "_self" | "_parent" | "_top";
}

// Default button size/colour/variant is small/primary/base
function Button({
  size = "sm",
  color = "primary",
  length = "", // empty string is falsy
  ...props
}: ButtonProps) {
  const Tag = "href" in props ? "a" : "button"; // conditionally rendered tags

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

export { Button };
