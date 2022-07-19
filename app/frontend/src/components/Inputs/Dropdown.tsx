// Eternal Imports
import React, { useId } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

// Type declaration for props
interface DropdownProps extends React.PropsWithChildren {
  addClass?: string;
  disabled?: boolean;
  label: string;
  labelHidden?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

function Dropdown({
  disabled = false,
  labelHidden = false,
  ...props
}: DropdownProps) {
  const dropdownId = useId();

  return (
    <div className={combineClasses(props.addClass)}>
      <label
        className={combineClasses(labelHidden && "sr-only")}
        htmlFor={dropdownId}
      >
        {props.label}
      </label>
      <select className="dropdown" id={dropdownId}>
        {props.children}
      </select>
    </div>
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
