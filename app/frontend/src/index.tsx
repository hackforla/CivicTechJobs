import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "router/App";
import "./index.scss";

if (process.env.MODE !== "production") {
  const reactAxe = require("@axe-core/react");
  reactAxe(React, ReactDOM, 1000);
}

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);

  process.env.MODE === "production"
    ? root.render(<RouterProvider router={router} />)
    : root.render(
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      );
}
