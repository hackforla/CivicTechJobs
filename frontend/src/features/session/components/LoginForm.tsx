"use client";

import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";

import TextField from "@/shared/components/TextField";

import styles from "./SessionForm.module.css";

type Inputs = {
  email: string;
  password: string;
};

// noValidate disables browser validation so react-hook-form rules apply alone.
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Sending form data to server...", data);
  };

  return (
    <div>
      <h3 className={styles.heading}>Log in</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        <button className={styles.submit}>Login</button>
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
