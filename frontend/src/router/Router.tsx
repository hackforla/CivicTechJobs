// External Imports
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Internal Imports
import { CreditsPage } from "pages/CreditsPage/CreditsPage";
import { Demo } from "pages/Demo/Demo";
import DemoTailwind from "pages/Demo/DemoTailwind";
import { NotFoundPage } from "pages/NotFoundPage/NotFoundPage";
import { LandingPage } from "pages/LandingPage/LandingPage";
import {
  QualifierPage,
  QualifierContent,
  loader as qualifierLoader,
} from "pages/QualifierPage/QualifierPage";
import AuthenticationPage from "pages/Authentication/page";
import HomeLayout from "pages/Layouts/HomeLayout";
import DefaultNavLayout from "pages/Layouts/DefaultNavLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
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
            path: "qualifier",
            element: <QualifierPage />,
            children: [
              {
                path: ":page",
                element: <QualifierContent />,
                loader: qualifierLoader,
              },
            ],
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
            path: "demo",
            element: <Demo />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
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
