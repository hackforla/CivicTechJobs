import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { IconEyeOpen } from "assets/images/images";

interface TextFieldProps extends React.PropsWithChildren {
  label: string;
  id: string;
  type: "text" | "email" | "password";
  register: UseFormRegister<any>;
  validations?: object;
  errors?: FieldError | undefined;
}

/** Reusable input group component
 *
 * @prop label -> Label for the input
 * @prop id -> ID for the input which also allows label to be linked to input
 * @prop type -> The type of input (text, email, password) may add more later
 * @prop register -> React Hook Form's register function
 * @prop validations -> React Hook Form's validation object
 * @prop errors -> React Hook Form's errors object
 *
 * @TODO The password input's "Forgot password" and toggle visibility functionality
 */

export default function TextField({
  label,
  id,
  type,
  register,
  validations,
  errors,
}: TextFieldProps) {
  return (
    <div className="w-full mb-3">
      <div className="mb-2 font-bold text-base">
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
          className={`h-11 w-full px-2 border rounded-lg ${
            errors
              ? "border-red focus:outline-red"
              : "border-grey focus:outline-blue-dark"
          }`}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <IconEyeOpen />
          </div>
        )}
      </div>
      {errors && (
        <p className="mt-1 text-red font-gothic font-bold">{errors.message}</p>
      )}
    </div>
  );
}
