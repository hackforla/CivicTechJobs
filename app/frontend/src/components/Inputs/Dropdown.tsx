// Eternal Imports
import React, { useId } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { ProtoInput, ProtoInputProps } from "./ProtoInput";
import { IconEyeOpen } from "assets/images/images";

// Type declaration for props
interface DropdownProps
  extends React.PropsWithChildren,
    Omit<ProtoInputProps, "innerComponent" | "icon" | "iconPosition" | "id"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

function Dropdown({ labelHidden = false, ...props }: DropdownProps) {
  const dropdownId = useId();

  function Select({ id }: { id: string }) {
    return <select className="dropdown">{props.children}</select>;
  }

  return (
    <ProtoInput
      addClass={props.addClass}
      icon={IconEyeOpen}
      iconPosition={"right"}
      id={dropdownId}
      innerComponent={Select}
      label={props.label}
      labelHidden={labelHidden}
    />
  );
}

interface DropdownItemProps extends React.PropsWithChildren {
  value: string | number;
}

function DropdownItem({ ...props }: DropdownItemProps) {
  return (
    <option className="dropdown-item" value={props.value}>
      {props.children}
    </option>
  );
}

export { Dropdown, DropdownItem };
