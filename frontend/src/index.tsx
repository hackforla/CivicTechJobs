import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import "tailwindcss/tailwind.css";

if (process.env.MODE !== "production") {
  const reactAxe = require("@axe-core/react");
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
