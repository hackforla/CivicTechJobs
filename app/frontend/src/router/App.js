// External Imports
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Internal Imports
import { Demo } from "pages/Demo/Demo";
import { LandingPage } from "pages/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("app"));

export default App;
