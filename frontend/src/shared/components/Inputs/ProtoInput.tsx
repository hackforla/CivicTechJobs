import React from "react";

import { cn } from "@/shared/lib/utils";

import styles from "./ProtoInput.module.css";

interface ProtoInputProps extends React.PropsWithChildren {
  addClass?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  id: string;
  label: string;
  labelHidden?: boolean;
  passRef?: React.RefCallback<HTMLDivElement>;
}

function ProtoInput({
  iconPosition = "left",
  labelHidden = false,
  ...props
}: ProtoInputProps) {
  const iconClass =
    iconPosition === "left" ? styles.inputIconLeft : styles.inputIconRight;
  return (
    <div className={cn(props.addClass)} ref={props.passRef}>
      <label
        className={cn(styles.label, labelHidden && styles.labelHidden)}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <div className={styles.row}>
        {iconPosition == "left" && props.icon && (
          <span className={iconClass}>
            <props.icon />
          </span>
        )}
        {props.children}
        {iconPosition == "right" && props.icon && (
          <span className={iconClass}>
            <props.icon />
          </span>
        )}
      </div>
    </div>
  );
}

export type { ProtoInputProps };
export { ProtoInput };
