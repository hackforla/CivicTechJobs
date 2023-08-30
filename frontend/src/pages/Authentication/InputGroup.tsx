import React, { ReactNode } from "react";

interface InputGroupProps extends React.PropsWithChildren {
  label: string;
  id: string;
  type: "text" | "email" | "password";
  icon?: ReactNode;
}

/** Reusable input group component
 *
 * @prop label -> Label for the input
 * @prop id -> ID for the input which also allows label to be linked to input
 * @prop type -> The type of input (text, email, password) may add more later
 * @prop icon -> Optional icon to be displayed on the right side of the password input
 */

export default function InputGroup({ label, id, type, icon }: InputGroupProps) {
  return (
    <div className="w-full mb-3">
      <div className="mb-1 font-bold text-base">
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        id={id}
        type={type}
        className="h-11 w-full px-2 border border-grey rounded-lg"
      />
      {icon && <div className="input-icon">{icon}</div>}
    </div>
  );
}
