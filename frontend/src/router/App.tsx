// External Imports
import React, { Fragment } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

// Internal Imports
import { Demo } from "pages/Demo/Demo";
import { NotFoundPage } from "pages/NotFoundPage/NotFoundPage";
import { LandingPage } from "pages/LandingPage/LandingPage";
import {
  QualifierPage,
  QualifierContent,
  loader as qualifierLoader,
} from "pages/QualifierPage/QualifierPage";

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
      <Route path="/demo" element={<Demo />} />
      <Route path="*" element={<NotFoundPage />} />
    </Fragment>
  )
);

export default router;
