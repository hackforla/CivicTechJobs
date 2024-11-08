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
        <div className="relative bg-tan-light max-lg:hidden lg:basis-1/2">
          <img
            src={loginIllustration}
            alt="Team work Pana Illustration"
            className="absolute left-1/2 top-1/2 z-20 w-4/5 -translate-x-1/2 -translate-y-1/2 transform"
          />
          <img
            src={loginTanBg}
            alt="Tan background for login/register page"
            className="absolute inset-x-0 bottom-0 w-full"
          />
          <img
            src={dotsSvg}
            alt="Corner dots pattern"
            className="absolute -right-4 -top-4 z-10 h-1/6 w-1/6 rotate-290 transform"
          />
          <img
            src={dotsSvg}
            alt="Corner dots pattern"
            className="absolute -bottom-4 -left-4 z-10 h-1/6 w-1/6 rotate-345 transform"
          />
        </div>
        <div className="w-full bg-tan lg:basis-1/2">
          <div className="flex h-full flex-col items-center justify-center lg:bg-white">
            <div className="w-10/12 lg:w-[439px]">
              <div className="lg:bg-transparent rounded-2xl bg-white max-lg:p-7">
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
