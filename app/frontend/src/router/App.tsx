// External Imports
import React, { Fragment } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

// Internal Imports
import { Demo } from "pages/Demo/Demo";
import { LandingPage } from "pages/LandingPage/LandingPage";
import {
  QualifierPage,
  QualifierContent,
  loader as qualifierLoader,
} from "pages/QualifierPage/QualifierPage";
import { CreditsPage } from "pages/CreditsPage/CreditsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<LandingPage />} />
      <Route path="qualifier/" element={<QualifierPage />}>
        <Route
          path=":page/"
          element={<QualifierContent />}
          loader={qualifierLoader}
        />
      </Route>
      <Route path="/credits" element={<CreditsPage />} />
      <Route path="/demo" element={<Demo />} />
    </Fragment>
  )
);

export default router;
