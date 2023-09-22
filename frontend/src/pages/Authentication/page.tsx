import React from "react";
import { useLocation } from "react-router-dom";
import { AuthNav } from "tw-components";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

/** AuthenticationPage
 * @dev handles both "/login" and "/signup" paths
 */

export default function AuthenticationPage() {
  const { pathname } = useLocation();

  return (
    <>
      <AuthNav />
      <div className="flex flex-row" style={{ height: "calc(100vh - 64px)" }}>
        <div className="max-lg:hidden lg:basis-1/2 bg-tan">
          {/* figma art here */}
        </div>
        <div className="w-full lg:basis-1/2 bg-tan">
          <div className="flex flex-col justify-center items-center h-full lg:bg-white">
            <div className="w-10/12 lg:w-[439px]">
              <div className="bg-white rounded-2xl lg:bg-transparent max-lg:p-7">
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
