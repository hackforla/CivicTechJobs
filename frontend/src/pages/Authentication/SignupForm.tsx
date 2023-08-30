import React from "react";
import { Link } from "react-router-dom";

import InputGroup from "./InputGroup";

export default function SignupForm() {
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
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          Already on Civic Tech Jobs?{" "}
          <Link to="/login" className="text-blue-dark font-bold underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
