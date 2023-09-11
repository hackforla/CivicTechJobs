import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IconEyeOpen } from "assets/images/images";

interface InputGroupProps extends React.PropsWithChildren {
  label: string;
  id: string;
  type: "text" | "email" | "password";
  register: UseFormRegister<any>;
  validations?: object;
}

/** Reusable input group component
 *
 * @prop label -> Label for the input
 * @prop id -> ID for the input which also allows label to be linked to input
 * @prop type -> The type of input (text, email, password) may add more later
 *
 * @TODO The password input's "Forgot password" and toggle visibility functionality
 */

export default function InputGroup({
  label,
  id,
  type,
  register,
  validations,
}: InputGroupProps) {
  return (
    <div className="w-full mb-3">
      <div className="mb-1 font-bold text-base">
        <label htmlFor={id}>{label}</label>
        {type === "password" && (
          <span className="text-blue-dark font-bold underline float-right cursor-pointer">
            Forgot password?
          </span>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={type}
          {...register(id, validations)}
          className="h-11 w-full px-2 border border-grey rounded-lg"
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <IconEyeOpen />
          </div>
        )}
      </div>
    </div>
  );
}
