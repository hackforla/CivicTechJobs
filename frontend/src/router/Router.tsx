// External Imports
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Internal Imports
import { CreditsPage } from "pages/CreditsPage/CreditsPage";
import { Demo } from "pages/Demo/Demo";
import DemoTailwind from "pages/Demo/DemoTailwind";
import { NotFoundPage } from "pages/NotFoundPage/NotFoundPage";
import { LandingPage } from "pages/LandingPage/LandingPage";
import AuthenticationPage from "pages/Authentication/page";
import HomeLayout from "layouts/HomeLayout";
import DefaultNavLayout from "layouts/DefaultNavLayout";
import PrivacyPolicyPage from "pages/PrivacyPolicyPage/PrivacyPolicyPage";

// TODO: fix lazy loading
/* const QualifierPage = lazy(
  () => import("../pages/QualifierPage/QualifierPage"),
); */
import QualifierPage from "pages/QualifierPage/QualifierPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <DefaultNavLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "qualifier/:page",
            /* element: (
              <Suspense fallback={<div>...loading</div>}>
                <QualifierPage />
              </Suspense>
            ), */
            element: <QualifierPage />,
          },
          {
            path: "credits",
            element: <CreditsPage />,
          },
          {
            path: "demo",
            element: <Demo />,
          },
          {
            path: "demo-tailwind",
            element: <DemoTailwind />,
          },
          {
            path: "privacypolicy",
            element: <PrivacyPolicyPage />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <AuthenticationPage />,
  },
  {
    path: "signup",
    element: <AuthenticationPage />,
  },
]);

export default router;
