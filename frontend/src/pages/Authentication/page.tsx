import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthNav, InputGroup } from "tw-components";
import { useForm, SubmitHandler } from "react-hook-form";

/** AuthenticationPage
 * @dev handles both "/login" and "/signup" paths
 */

export default function AuthenticationPage() {
  const { pathname } = useLocation();

  return (
    <>
      <AuthNav />
      <div className="flex flex-row" style={{ height: "calc(100vh - 64px)" }}>
        <div className="hidden lg:block lg:basis-1/2 bg-tan">
          {/* figma art here */}
        </div>
        <div className="w-full lg:basis-1/2 bg-tan">
          <div className="flex flex-col justify-center items-center h-full lg:bg-white">
            <div className="w-10/12 lg:w-[439px]">
              <div className="bg-white p-6 rounded-2xl lg:bg-transparent lg:p-0 ">
                {pathname === "/login" && <LoginForm />}
                {pathname === "/signup" && <SignupForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Sending form data to server...", data);
  };
  return (
    <div>
      <h3 className="mb-4 text-4xl">Sign up</h3>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <InputGroup
            label="First name"
            id="firstName"
            type="text"
            register={register}
          />
          <InputGroup
            label="Last Name"
            id="lastName"
            type="text"
            register={register}
          />
        </div>
        <InputGroup label="Email" id="email" type="email" register={register} />
        <InputGroup
          label="Password"
          id="password"
          type="password"
          register={register}
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

type Inputs = {
  example: string;
  exampleRequired: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Sending form data to server...", data);
  };

  return (
    <div>
      <h3 className="mb-8 text-4xl">Log in</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Email"
          id="email"
          type="email"
          register={register}
          validations={{ required: "Please enter your email address" }}
        />
        <InputGroup
          label="Password"
          id="password"
          type="password"
          register={register}
          validations={{ required: "Please enter your password", minLength: 6 }}
        />
        <div className="flex mb-3">
          <input type="checkbox" className="mr-1" />
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
