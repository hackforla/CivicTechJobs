// External Imports
import React from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ButtonSharedProps extends React.PropsWithChildren {
  addClass?: string;
  color?: "primary" | "primary-dark";
  disabled?: boolean;
  length?: "" | "long";
  size?: "sm" | "md" | "lg" | "icon";
}

interface ButtonAnchorProps extends ButtonSharedProps {
  href: string;
  onClick?: never;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

interface ButtonButtonProps extends ButtonSharedProps {
  href?: never;
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  target?: never;
}

type ButtonProps = ButtonAnchorProps | ButtonButtonProps;

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
