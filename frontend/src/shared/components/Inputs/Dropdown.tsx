"use client";

import React, { Fragment, useId, useState } from "react";
import {
  useFloating,
  useDismiss,
  useInteractions,
  autoUpdate,
  offset,
} from "@floating-ui/react";

import { ProtoInput, type ProtoInputProps } from "./ProtoInput";
import IconDropdownDown from "@/shared/icons/icon-dropdown-down.svg";
import IconDropdownUp from "@/shared/icons/icon-dropdown-up.svg";
import { cn, onKey } from "@/shared/lib/utils";
import styles from "./Dropdown.module.css";

interface DropdownProps
  extends React.PropsWithChildren,
    Omit<ProtoInputProps, "innerComponent" | "icon" | "iconPosition" | "id"> {
  ariaLabel: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
}

function Dropdown({ labelHidden = false, ...props }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownId = useId();
  const dropdownBoxId = useId();

  const { refs, floatingStyles, context } = useFloating<HTMLDivElement>({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(0)],
    whileElementsMounted: autoUpdate,
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <Fragment>
      <ProtoInput
        addClass={props.addClass}
        icon={open ? IconDropdownUp : IconDropdownDown}
        iconPosition={"right"}
        id={dropdownId}
        label={props.label}
        labelHidden={labelHidden}
        passRef={refs.setReference}
      >
        <div
          {...getReferenceProps()}
          aria-controls={dropdownBoxId}
          aria-expanded={open}
          aria-label={props.ariaLabel}
          aria-owns={dropdownBoxId}
          id={dropdownId}
          className={styles.dropdown}
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
        {...getFloatingProps()}
        ref={refs.setFloating}
        className={cn(styles.dropdownBox, !open && styles.dropdownBoxHidden)}
        id={dropdownBoxId}
        role="listbox"
        style={floatingStyles}
      >
        {props.children}
      </ul>
    </Fragment>
  );
}

interface DropdownOptionProps extends React.PropsWithChildren {
  onClick: (value: string | number) => void;
  selected: boolean;
  value: string | number;
}

function DropdownOption({ ...props }: DropdownOptionProps) {
  return (
    <li
      aria-selected={props.selected}
      className={styles.dropdownRow}
      onClick={() => props.onClick(props.value)}
      onKeyDown={(e) => onKey(() => props.onClick(props.value), "Enter")(e)}
      role="option"
    >
      <div>{props.children}</div>
    </li>
  );
}

export { Dropdown, DropdownOption };
