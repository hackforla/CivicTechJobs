import React from "react";
import { Link } from "react-router-dom";

import InputGroup from "./InputGroup";

export default function LoginForm() {
  return (
    <div>
      <h3 className="mb-4 text-4xl">Log in</h3>
      <form>
        <InputGroup label="Email" id="email" type="email" />
        <InputGroup label="Password" id="password" type="password" />
        <div className="flex mb-3">
          <input type="checkbox" className="mr-1" />
          <p>Keep me signed in</p>
        </div>
        <button className="bg-[#3450A1] font-bold w-full text-white py-[12px] rounded-3xl">
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          New to Civic Tech Jobs?{" "}
          <Link to="/signup" className="text-blue-800 font-bold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
