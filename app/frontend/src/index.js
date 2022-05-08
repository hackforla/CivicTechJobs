import React from "react";
import ReactDOM from "react-dom";

import App from "router/App";
import "./index.scss";

if (process.env.MODE !== "production") {
  const reactAxe = require("@axe-core/react").default;
  reactAxe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById("app"));
