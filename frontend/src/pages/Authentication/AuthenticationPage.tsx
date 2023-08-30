import React from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { useLocation } from "react-router-dom";

/** AuthenticationPage
 * - handles both "/login" and "/signup" paths
 */

export default function AuthenticationPage() {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-row" style={{ height: "calc(100vh - 64px)" }}>
      <div className="w-full lg:basis-1/2 bg-tan">
        <div className="lg:hidden flex flex-col justify-center items-center h-full">
          <div className="w-10/12">
            <div className="bg-white p-3 rounded-2xl">
              {pathname === "/login" && <LoginForm />}
              {pathname === "/signup" && <SignupForm />}
            </div>
          </div>
        </div>
      </div>
      <div className="max-lg:hidden basis-1/2">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-[439px]">
            {pathname === "/login" && <LoginForm />}
            {pathname === "/signup" && <SignupForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
