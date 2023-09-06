import { FooterNav, HeaderNav } from "components/components";
import React from "react";
import { Outlet } from "react-router-dom";

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
