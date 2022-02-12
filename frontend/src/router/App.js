// External Imports
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Internal Imports
import Demo from "pages/Demo/Demo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("app"));

export default App;
