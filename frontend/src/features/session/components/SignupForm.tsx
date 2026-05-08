/**
 * Signup form for the `/signup` route.
 *
 * Wires `react-hook-form` validation (RHF) for first name, last
 * name, email, and password fields with inline error messages.
 *
 * On submit:
 * 1. Combines `firstName + lastName` into a single `name` (the
 *    backend's `RegisterSerializer` takes one `name` field).
 * 2. Calls `authApi.signup` via the `useAuth()` context. The
 *    backend auto-logs-in on success, so the context updates
 *    `user` directly and the form pushes the router to `/`
 *    (landing).
 * 3. On `ApiError`, surfaces the server's `message` at the top of
 *    the form (e.g. "A user with that email already exists.",
 *    "Request validation failed."). Field-level errors
 *    (`err.fields`) aren't displayed inline yet; the top-level
 *    message is sufficient for the common cases.
 *
 * Mounted by the `/signup` page route in the `(auth)` route
 * group.
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { signup } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`.trim(),
      });
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
      <h3 className={styles.headingWide}>Sign up</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError ? (
          <p className={styles.serverError} role="alert">
            {serverError}
          </p>
        ) : null}
        <div className={styles.nameGrid}>
          <TextField
            label="First name"
            id="firstName"
            type="text"
            register={register}
            errors={errors.firstName}
            validations={{ required: "Please enter first name" }}
          />
          <TextField
            label="Last Name"
            id="lastName"
            type="text"
            register={register}
            errors={errors.lastName}
            validations={{ required: "Please enter last name" }}
          />
        </div>
        <TextField
          label="Email"
          id="email"
          type="email"
          register={register}
          errors={errors.email}
          validations={{
            required: "Please enter your email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email address",
            },
          }}
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
        <button className={styles.submit} type="submit" disabled={submitting}>
          {submitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className={styles.altLink}>
        <p>
          Already on Civic Tech Jobs?{" "}
          <Link href="/login" className={styles.altLinkAnchor}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
