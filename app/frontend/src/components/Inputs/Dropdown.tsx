// Eternal Imports
import React, { Fragment, useEffect, useId, useState } from "react";
import { usePopper } from "react-popper";

// Internal Imports
import { ProtoInput, ProtoInputProps } from "./ProtoInput";
import { IconDropdownDown, IconDropdownUp } from "assets/images/images";
import { combineClasses, onKey } from "components/Utility/utils";

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

  return (
    <Fragment>
      <ProtoInput
        addClass={props.addClass}
        icon={open ? IconDropdownUp : IconDropdownDown}
        iconPosition={"right"}
        id={dropdownId}
        label={props.label}
        labelHidden={labelHidden}
        passRef={setReferenceElement}
      >
        <div
          aria-controls={dropdownBoxId}
          aria-expanded={open}
          aria-label={props.ariaLabel}
          aria-owns={dropdownBoxId}
          id={dropdownId}
          className="dropdown"
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => onKey(() => setOpen(!open), "Enter")(e)}
          onMouseDown={(e) => e.preventDefault()}
          role="combobox"
          tabIndex={0}
        >
          {props.value}
        </div>
      </ProtoInput>
      <ul
        className={combineClasses("dropdown-box p-0", open || "hidden")}
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

interface DropdownOptionProps extends React.PropsWithChildren {
  onClick: (value: string | number) => any;
  selected: boolean;
  value: string | number;
}

function DropdownOption({ ...props }: DropdownOptionProps) {
  return (
    <li
      aria-selected={props.selected}
      className="dropdown-row px-2"
      onClick={() => props.onClick(props.value)}
      onKeyDown={(e) => onKey(props.onClick, "Enter")(e)}
      role="option"
    >
      <div>{props.children}</div>
    </li>
  );
}

export { Dropdown, DropdownOption };
