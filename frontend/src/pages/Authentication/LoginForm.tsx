import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "tw-components";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

/** Login Form Component
 *
 * @dev noValidate on form to disable browser vaildation so we can use react-hook-form validations instead
 *
 */

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
      <h3 className="mb-10 text-4xl font-bold">Log in</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          id="email"
          type="email"
          register={register}
          validations={{ required: "Please enter your email address" }}
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
        <div className="flex mb-4">
          <input type="checkbox" className="mr-2" />
          <p className="text-grey-dark">Keep me signed in</p>
        </div>
        <button className="font-bold w-full text-white py-[12px] rounded-3xl bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused">
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          New to Civic Tech Jobs?{" "}
          <Link to="/signup" className="text-blue-dark font-bold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
