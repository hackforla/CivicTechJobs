/**
 * Generic text input field tied to react-hook-form.
 *
 * Generic over the form's value shape (`TFormValues`) so the
 * field name (`id` prop) is type-checked against the actual form
 * schema at call site. The legacy version pinned this to a fixed
 * `{ password: string }` type which broke for any non-password
 * field.
 *
 * Renders a label, an `<input>` registered with RHF, an optional
 * "eye" icon for password fields, and an inline error message.
 * For controlled non-form inputs, use `<input>` directly or build
 * a non-RHF wrapper - this component assumes RHF integration.
 *
 * Hydration note: password-manager extensions (Bitwarden, Roboform,
 * etc.) both mutate input attributes and inject sibling icon
 * elements between SSR HTML landing and React hydrating. React 19's
 * hydration check treats the resulting tree-shape change as a
 * mismatch even with `suppressHydrationWarning`. Gating the input
 * on a post-mount flag means SSR renders the wrapper without the
 * input, so there is nothing for the extension to mutate before
 * hydration completes.
 */

"use client";

import React, { useEffect, useState } from "react";

import IconEyeOpen from "@/shared/icons/icon-eye-open.svg";
import { cn } from "@/shared/lib/utils";

import styles from "./TextField.module.css";

import type {
  FieldValues,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextFieldProps<TFormValues extends FieldValues> {
  label: string;
  id: Path<TFormValues>;
  type: "text" | "email" | "password";
  register: UseFormRegister<TFormValues>;
  validations?: RegisterOptions<TFormValues, Path<TFormValues>>;
  errors?: FieldError;
}

export default function TextField<TFormValues extends FieldValues>({
  label,
  id,
  type,
  register,
  validations,
  errors,
}: TextFieldProps<TFormValues>) {
  // See module docstring for the password-manager hydration rationale.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.labelRow}>
        <label htmlFor={id}>{label}</label>
        {type === "password" && (
          <span className={styles.forgot}>Forgot password?</span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        {mounted && (
          <>
            <input
              id={id}
              type={type}
              {...register(id, validations)}
              className={cn(styles.input, errors && styles.inputError)}
            />
            {type === "password" && (
              <div className={styles.passwordIcon}>
                <IconEyeOpen />
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.errorMessage}>{errors && errors.message}</div>
    </div>
  );
}
