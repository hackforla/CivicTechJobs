import React from "react";
import { Outlet } from "react-router-dom";
import { FooterNav } from "components/components";
import { HeaderNav } from "tw-components";

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
