"use client";

import React, { useEffect, useState } from "react";
import type {
  FieldValues,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import IconEyeOpen from "@/shared/icons/icon-eye-open.svg";

interface TextFieldProps<TFormValues extends FieldValues> {
  label: string;
  id: Path<TFormValues>;
  type: "text" | "email" | "password";
  register: UseFormRegister<TFormValues>;
  validations?: RegisterOptions<TFormValues, Path<TFormValues>>;
  errors?: FieldError;
}

// Generic over the form's value shape so the field name (`id`) is checked
// against the actual form schema. The legacy version pinned this to a
// fixed `{ password: string }` type which broke for any non-password
// field.
export default function TextField<TFormValues extends FieldValues>({
  label,
  id,
  type,
  register,
  validations,
  errors,
}: TextFieldProps<TFormValues>) {
  // Password-manager extensions (Bitwarden, Roboform, the "shark" family)
  // both mutate input attributes AND inject sibling icon elements
  // between the SSR HTML landing and React hydrating. React 19's
  // hydration check treats the resulting tree-shape change as a
  // mismatch even with suppressHydrationWarning. Gating the input on
  // a post-mount flag means SSR renders the wrapper without the
  // input, so there is nothing for the extension to mutate before
  // hydration completes.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="relative h-11">
        {mounted && (
          <>
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
          </>
        )}
      </div>

      <div className="font-gothic flex h-8 flex-col justify-center font-bold text-red">
        {errors && errors.message}
      </div>
    </div>
  );
}
