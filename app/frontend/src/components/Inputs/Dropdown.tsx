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
  ariaLabel: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => any;
  value: string | number;
}

function Dropdown({ labelHidden = false, ...props }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(
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
  const dropdownBoxId = useId();

  useEffect(() => {
    const popperElement = state?.elements.popper;
    const dropdownElement = state?.elements.reference;

    // Close popup if click is outside of dropdown
    function handleClick(e: MouseEvent) {
      if (e.target instanceof HTMLElement) {
        if (popperElement?.contains(e.target)) {
          setOpen(false);
        } else if (
          dropdownElement instanceof HTMLElement &&
          dropdownElement?.contains(e.target)
        ) {
          setOpen(!open);
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

  return (
    <Fragment>
      <div ref={setReferenceElement}>
        <ProtoInput
          addClass={combineClasses(props.addClass)}
          icon={open ? IconDropdownUp : IconDropdownDown}
          iconPosition={"right"}
          id={dropdownId}
          label={props.label}
          labelHidden={labelHidden}
        >
          <div
            aria-expanded={open}
            aria-label={props.ariaLabel}
            aria-owns={dropdownBoxId}
            id={dropdownId}
            className="dropdown"
            onMouseDown={(e) => e.preventDefault()}
            role="combobox"
          >
            {props.value}
          </div>
        </ProtoInput>
      </div>
      <ul
        className={combineClasses("dropdown-box", open || "hidden")}
        id={dropdownBoxId}
        ref={setPopperElement}
        role="listbox"
        style={styles.popper}
        {...attributes.popper}
      >
        {props.children}
      </ul>
    </Fragment>
  );
}

interface DropdownItemProps extends React.PropsWithChildren {
  onClick: (value: string | number) => any;
  value: string | number;
}

function DropdownItem({ ...props }: DropdownItemProps) {
  return (
    <li
      className="dropdown-row"
      onClick={() => props.onClick(props.value)}
      role="option"
    >
      <div className="dropdown-item">{props.children}</div>
    </li>
  );
}

export { Dropdown, DropdownItem };
