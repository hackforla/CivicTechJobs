import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import "tailwindcss/tailwind.css";
import reactAxe from "@axe-core/react";
import "vite/modulepreload-polyfill"; // required for vite entrypoint backend (django) integration

if (import.meta.env.MODE !== "production") {
  reactAxe(React, ReactDOM, 1000);
}

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);

  import.meta.env.MODE === "production"
    ? root.render(<App />)
    : root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
}
