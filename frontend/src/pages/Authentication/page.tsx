import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthNav, InputGroup } from "tw-components";

/** AuthenticationPage
 * @dev handles both "/login" and "/signup" paths
*/

export default function AuthenticationPage() {
  return (
    <>
      <AuthNav />
      <div className="flex flex-row" style={{ height: "calc(100vh - 64px)" }}>
        <div className="w-full lg:basis-1/2 bg-tan">
          <div className="lg:hidden flex flex-col justify-center items-center h-full">
            <div className="w-10/12">
              <div className="bg-white p-3 rounded-2xl">
                <AuthForm />
              </div>
            </div>
          </div>
        </div>
        <div className="max-lg:hidden basis-1/2">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-[439px]">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AuthForm() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/login" && <LoginForm />}
      {pathname === "/signup" && <SignupForm />}
    </>
  );
}

function SignupForm() {
  return (
    <div>
      <h3 className="mb-4 text-4xl">Sign up</h3>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <InputGroup label="First name" id="firstName" type="text" />
          <InputGroup label="Last Name" id="lastName" type="text" />
        </div>

        <InputGroup label="Email" id="email" type="email" />
        <InputGroup label="Password" id="password" type="password" />
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

function LoginForm() {
  return (
    <div>
      <h3 className="mb-4 text-4xl">Log in</h3>
      <form>
        <InputGroup label="Email" id="email" type="email" />
        <InputGroup label="Password" id="password" type="password" />
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
