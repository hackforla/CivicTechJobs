import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "tw-components";
import { useForm, SubmitHandler } from "react-hook-form";

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
          validations={{ required: "Please enter your email address" }}
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
        <button className="font-bold w-full text-white py-[12px] rounded-3xl bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused">
          Sign Up
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          Already on Civic Tech Jobs?{" "}
          <Link to="/login" className="text-blue-dark font-bold underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
