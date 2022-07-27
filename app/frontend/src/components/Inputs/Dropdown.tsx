// @ts-nocheck
// Eternal Imports
import React, { Fragment, useId, useState } from "react";
import { usePopper } from "react-popper";

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
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });
  const dropdownId = useId();

  function handleClick(e) {
    setOpen(!open);
  }

  return (
    <Fragment>
      <ProtoInput
        addClass={combineClasses(props.addClass)}
        icon={open ? IconDropdownUp : IconDropdownDown}
        iconPosition={"right"}
        id={dropdownId}
        label={props.label}
        labelHidden={labelHidden}
      >
        <select
          id={dropdownId}
          className="dropdown"
          onClick={handleClick}
          onMouseDown={(e) => e.preventDefault()}
          ref={setReferenceElement}
        ></select>
      </ProtoInput>
      <div
        className={combineClasses("dropdown-box", open || "hidden")}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {props.children}
      </div>
      <div>text</div>
    </Fragment>
  );
}

/*
<div 
  class="dropdown-box" 
  style="position: absolute; inset: 0px auto auto 0px; transform: translate3d(236px, 395px, 0px);"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="bottom">
</div>

<div 
  class="dropdown-box" 
  style="position: absolute; inset: 0px auto auto 0px; transform: translate3d(0px, 395px, 0px);"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="bottom">
</div>

*/

interface DropdownItemProps extends React.PropsWithChildren {
  value: string | number;
}

function DropdownItem({ ...props }: DropdownItemProps) {
  return <div className="dropdown-item">{props.children}</div>;
}

export { Dropdown, DropdownItem };
