import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderNav, FooterNav } from "tw-components";

const DefaultNavLayout = () => {
  return (
    <>
      <HeaderNav />
      <Outlet />
      <FooterNav />
    </>
  );
};

export default DefaultNavLayout;
