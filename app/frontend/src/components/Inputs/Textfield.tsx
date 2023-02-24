// Eternal Imports
import React, { useId } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { ProtoInput, ProtoInputProps } from "./ProtoInput";

interface TextFieldProps
  extends Omit<ProtoInputProps, "innerComponent" | "id"> {
  addInputClass?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?:
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
    <ProtoInput
      addClass={props.addClass}
      icon={props.icon}
      id={textFieldId}
      iconPosition={iconPosition}
      label={props.label}
      labelHidden={labelHidden}
    >
      <input
        id={textFieldId}
        type={type}
        className={combineClasses(
          props.icon
            ? `textfield-${iconPosition == "left" ? "right" : "left"}`
            : "textfield",
          props.addInputClass
        )}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
        }}
        placeholder={props.placeholder}
      />
    </ProtoInput>
  );
}

export { TextField };
