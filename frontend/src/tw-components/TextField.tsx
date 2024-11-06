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
    <div className="w-full">
      <div className="mb-1 text-base font-bold">
        <label htmlFor={id}>{label}</label>
        {type === "password" && (
          <span className="float-right cursor-pointer font-bold text-blue-dark underline">
            Forgot password?
          </span>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={type}
          {...register(id, validations)}
          className={`h-11 w-full rounded-lg border px-2 ${
            errors
              ? "border-red focus:outline-red"
              : "border-grey focus:outline-blue-dark"
          }`}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <IconEyeOpen />
          </div>
        )}
      </div>

      <div className="font-gothic flex h-8 flex-col justify-center font-bold text-red">
        {errors && errors.message}
      </div>
    </div>
  );
}
