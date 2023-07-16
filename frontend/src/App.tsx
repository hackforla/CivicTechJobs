// External imports
import React from "react";
import { RouterProvider } from "react-router-dom";

// Internal imports
import router from "router/App";
import { HeaderNav, FooterNav } from "components/components";

export default function App() {
  return (
    <>
      <HeaderNav />
      <RouterProvider router={router} />
      <FooterNav />
    </>
  );
}
