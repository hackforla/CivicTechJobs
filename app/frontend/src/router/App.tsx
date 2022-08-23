// External Imports
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Internal Imports
import { Demo } from "pages/Demo/Demo";
import { LandingPage } from "pages/LandingPage/LandingPage";
import { CalendarPage } from "pages/CalendarPage/CalendarPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
