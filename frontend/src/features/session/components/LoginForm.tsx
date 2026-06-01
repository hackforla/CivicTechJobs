/**
 * Login form for the `/login` route.
 *
 * Wires `react-hook-form` validation (RHF) for email and password
 * fields with inline error messages. The `noValidate` attribute on
 * the form disables browser-native validation so RHF rules are the
 * single source of truth.
 *
 * On submit:
 * 1. Calls `authApi.login` via the `useAuth()` context.
 * 2. On success, the context updates `user` and the form pushes the
 *    router to `/` (landing).
 * 3. On `ApiError`, surfaces the server's `message` at the top of
 *    the form. Field-level errors (`err.fields`) are not displayed
 *    inline yet - login errors are typically a single
 *    "Invalid email or password" string, not field-shaped.
 *
 * Mounted by the `/login` page route in the `(auth)` route group.
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import TextField from "@/shared/components/TextField";
import { useAuth } from "@/shared/contexts/AuthContext";
import { ApiError } from "@/shared/lib/api/client";

import styles from "./SessionForm.module.css";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      await login({ email: data.email, password: data.password });
      router.push("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className={styles.heading}>Log in</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError ? (
          <p className={styles.serverError} role="alert">
            {serverError}
          </p>
        ) : null}
        <TextField
          label="Email"
          id="email"
          type="email"
          register={register}
          validations={{
            required: "Please enter your email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email address",
            },
          }}
          errors={errors.email}
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          register={register}
          validations={{
            required: "Please enter your password",
            pattern: {
              value: /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
              message:
                "Must be 8 or more characters and contain at least 1 number and 1 special character",
            },
          }}
          errors={errors.password}
        />
        <div className={styles.checkboxRow}>
          {/* Browser extensions decorate inputs with data-* attributes
          after the SSR HTML lands; suppressHydrationWarning is the
          documented escape hatch for attribute-only mismatches. */}
          <input
            type="checkbox"
            className={styles.checkbox}
            suppressHydrationWarning
          />
          <p className={styles.checkboxLabel}>Keep me signed in</p>
        </div>
        <button className={styles.submit} type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className={styles.altLink}>
        <p>
          New to Civic Tech Jobs?{" "}
          <Link href="/signup" className={styles.altLinkAnchor}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
