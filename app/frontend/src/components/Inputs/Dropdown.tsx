// Eternal Imports
import React, { Fragment, useEffect, useId, useState } from "react";
import { usePopper } from "react-popper";

// Internal Imports
import { ProtoInput, ProtoInputProps } from "./ProtoInput";
import { IconDropdownDown, IconDropdownUp } from "assets/images/images";
import { combineClasses } from "components/Utility/utils";
import { VirtualElement } from "@popperjs/core";

// Type declaration for props
interface DropdownProps
  extends React.PropsWithChildren,
    Omit<ProtoInputProps, "innerComponent" | "icon" | "iconPosition" | "id"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

function Dropdown({ labelHidden = false, ...props }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLSelectElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes, state } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 0],
          },
        },
      ],
    }
  );
  const dropdownId = useId();

  useEffect(() => {
    let dropdownElements: Element[] = [];
    if (state?.elements.popper) dropdownElements.push(state.elements.popper);
    if (state?.elements.reference instanceof Element)
      dropdownElements.push(state.elements.reference);

    function handleClick(e: MouseEvent) {
      for (const element of dropdownElements) {
        if (e.target instanceof Element && !element.contains(e.target)) {
          document.body.style.backgroundColor = "yellow";
        }
      }
    }

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
      document.body.style.backgroundColor = "white";
    };
  }, [state]);

  function handleClick() {
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
        <div
          className={combineClasses("dropdown-box", open || "hidden")}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {props.children}
        </div>
      </ProtoInput>
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
