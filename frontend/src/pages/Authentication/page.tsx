import React from "react";
import { useLocation } from "react-router-dom";
import { AuthNav } from "tw-components";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { loginTanBg, dotsSvg, loginIllustration } from "assets/images/images";

/** AuthenticationPage
 * @dev handles both "/login" and "/signup" paths
 */
export default function AuthenticationPage() {
  const { pathname } = useLocation();

  return (
    <>
      <AuthNav />
      <div
        className="flex flex-row"
        style={{ height: "calc(100vh - 64px)", overflow: "hidden" }}
      >
        <div className="max-lg:hidden lg:basis-1/2 bg-tan-light relative">
          <img
            src={loginIllustration}
            alt="Team work Pana Illustration"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 z-20"
          />
          <img
            src={loginTanBg}
            alt="Tan background for login/register page"
            className="absolute inset-x-0 bottom-0 w-full"
          />
          <img
            src={dotsSvg}
            alt="Corner dots pattern"
            className="absolute -top-4 -right-4 w-1/6 h-1/6 transform rotate-290 z-10"
          />
          <img
            src={dotsSvg}
            alt="Corner dots pattern"
            className="absolute -bottom-4 -left-4 w-1/6 h-1/6 transform rotate-345 z-10"
          />
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
