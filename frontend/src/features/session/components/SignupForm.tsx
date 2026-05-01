"use client";

import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";

import TextField from "@/shared/components/TextField";

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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Sending form data to server...", data);
  };

  return (
    <div>
      <h3 className="mb-10 text-4xl font-bold">Sign up</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
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
        <button className="w-full rounded-3xl bg-blue-dark py-[12px] font-bold text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused">
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Already on Civic Tech Jobs?{" "}
          <Link href="/login" className="font-bold text-blue-dark underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
