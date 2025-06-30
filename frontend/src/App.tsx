// Redirect civictechjobs.org to stage site
if (window.location.hostname === "civictechjobs.org") {
  window.location.replace("https://stage.civictechjobs.org");
}

// External imports
import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

// Internal imports
import router from "router/Router";
import CookieBanner from "tw-components/CookieBanner";

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        <CookieBanner />
      </Suspense>
    </>
  );
}
