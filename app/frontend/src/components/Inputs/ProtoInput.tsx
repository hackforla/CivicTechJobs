// Eternal Imports
import React, { useId } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ProtoInputProps {
  addClass?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  id: string;
  innerComponent: any;
  label: string;
  labelHidden?: boolean;
}

function ProtoInput({
  iconPosition = "left",
  labelHidden = false,
  ...props
}: ProtoInputProps) {
  return (
    <div className={combineClasses("flex-column", props.addClass)}>
      <label
        className={combineClasses("title-6", "mb-1", labelHidden && "sr-only")}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <div className="flex-container align-center">
        {iconPosition == "left" && props.icon && (
          <span className={`input-icon-${iconPosition}`}>
            <props.icon />
          </span>
        )}
        <props.innerComponent />
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
