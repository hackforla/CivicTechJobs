// Eternal Imports
import React, { useId } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface TextFieldProps {
  addClass: string;
  addInputClass: string;
  icon: React.ReactElement;
  iconPosition: "left" | "right";
  label: string;
  labelHidden: boolean;
  onChange: Function;
  placeholder: string;
  type:
    | "text"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week";
}

function TextField({
  iconPosition = "left",
  labelHidden = false,
  type = "text",
  ...props
}: TextFieldProps) {
  const textFieldId = useId();

  return (
    <div className={combineClasses("flex-column", props.addClass)}>
      <label
        className={combineClasses("title-6", "mb-1", labelHidden && "sr-only")}
        htmlFor={textFieldId}
      >
        {props.label}
      </label>
      <div className="flex-container align-center">
        {iconPosition == "left" && props.icon && (
          <span className={`textfield-icon-${iconPosition}`}>
            <props.icon />
          </span>
        )}
        <input
          id={textFieldId}
          type={type}
          className={combineClasses(
            "textfield-input",
            `textfield-input-${iconPosition == "left" ? "right" : "left"}`,
            props.addInputClass
          )}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
          }}
          placeholder={props.placeholder}
        />
        {iconPosition == "right" && props.icon && (
          <span className={`textfield-icon-${iconPosition}`}>
            <props.icon />
          </span>
        )}
      </div>
    </div>
  );
}

export { TextField };
