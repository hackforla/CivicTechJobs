// Eternal Imports
import React, { useId } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ProtoInputProps extends React.PropsWithChildren {
  addClass?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  id: string;
  label: string;
  labelHidden?: boolean;
  passRef?: any;
}

function ProtoInput({
  iconPosition = "left",
  labelHidden = false,
  ...props
}: ProtoInputProps) {
  return (
    <div className={combineClasses(props.addClass)} ref={props.passRef}>
      <label
        className={combineClasses("title-6", "mb-1", labelHidden && "sr-only")}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <div className="flex-center-y">
        {iconPosition == "left" && props.icon && (
          <span className={`input-icon-${iconPosition}`}>
            <props.icon />
          </span>
        )}
        {props.children}
        {iconPosition == "right" && props.icon && (
          <span className={`input-icon-${iconPosition}`}>
            <props.icon />
          </span>
        )}
      </div>
    </div>
  );
}

export { ProtoInput, ProtoInputProps };
