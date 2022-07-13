import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import App from "router/App";
import "./index.scss";

if (process.env.MODE !== "production") {
  const reactAxe = require("@axe-core/react").default;
  reactAxe(React, ReactDOM, 1000);
}

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);

  process.env.MODE === "production"
    ? root.render(<App />)
    : root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
}
