// External Imports
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Internal Imports
import { Demo } from "pages/Demo/Demo";
import { LandingPage } from "pages/LandingPage/LandingPage";
import { QualifierPage } from "pages/QualifierPage/QualifierPage";
import { CreditsPage } from "pages/CreditsPage/CreditsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/qualifier" element={<QualifierPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
