// Eternal Imports
import React, { Fragment, useEffect, useId, useState } from "react";
import { usePopper } from "react-popper";

// Internal Imports
import { ProtoInput, ProtoInputProps } from "./ProtoInput";
import { IconDropdownDown, IconDropdownUp } from "assets/images/images";
import { combineClasses } from "components/Utility/utils";

// Type declaration for props
interface DropdownProps
  extends React.PropsWithChildren,
    Omit<ProtoInputProps, "innerComponent" | "icon" | "iconPosition" | "id"> {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => any;
}

function Dropdown({ labelHidden = false, ...props }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
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
    const popperElement = state?.elements.popper;
    const dropdownElement = state?.elements.reference;

    // Close popup if click is outside of dropdown
    function handleClick(e: MouseEvent) {
      if (e.target instanceof HTMLElement) {
        if (popperElement?.contains(e.target)) {
          return;
        } else if (
          dropdownElement instanceof HTMLElement &&
          dropdownElement?.contains(e.target)
        ) {
          return;
        } else {
          setOpen(false);
        }
      }
    }

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [state]);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Fragment>
      <div ref={setReferenceElement} onClick={handleClick}>
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
            onMouseDown={(e) => e.preventDefault()}
          ></select>
        </ProtoInput>
      </div>
      <div
        className={combineClasses("dropdown-box", open || "hidden")}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {props.children}
      </div>
    </Fragment>
  );
}

interface DropdownItemProps extends React.PropsWithChildren {
  value: string | number;
}

function DropdownItem({ ...props }: DropdownItemProps) {
  return (
    <option className="dropdown-row">
      <div className="dropdown-item">{props.children}</div>
    </option>
  );
}

export { Dropdown, DropdownItem };
