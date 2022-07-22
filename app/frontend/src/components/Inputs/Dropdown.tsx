// Eternal Imports
import React, { Fragment, useId, useState } from "react";

// Internal Imports
import { ProtoInput, ProtoInputProps } from "./ProtoInput";
import { IconDropdownDown, IconDropdownUp } from "assets/images/images";
import { combineClasses } from "components/Utility/utils";

// Type declaration for props
interface DropdownProps
  extends React.PropsWithChildren,
    Omit<ProtoInputProps, "innerComponent" | "icon" | "iconPosition" | "id"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

function Dropdown({ labelHidden = false, ...props }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownId = useId();

  function Select({ id }: { id: string }) {
    return <select className="dropdown"></select>;
  }

  return (
    <Fragment>
      <ProtoInput
        addClass={combineClasses(props.addClass)}
        icon={open ? IconDropdownUp : IconDropdownDown}
        iconPosition={"right"}
        id={dropdownId}
        innerComponent={Select}
        label={props.label}
        labelHidden={labelHidden}
      />
      <div className="dropdown-box">{props.children}</div>
    </Fragment>
  );
}

interface DropdownItemProps extends React.PropsWithChildren {
  value: string | number;
}

function DropdownItem({ ...props }: DropdownItemProps) {
  return <div className="dropdown-item">{props.children}</div>;
}

export { Dropdown, DropdownItem };
