import React, { Component } from "react";
import { render } from "react-dom";

function App() {
    return (
        <div>
            <h1>Hi</h1>
            <div><span className="red">does this work?</span> or this? test</div>
            <br></br>
            <div className="red">CivicTechJobs unites ambitious technology practitioners with volunteer opportunities from a central hub of listings to build digital products, programs, and services.</div>
        </div>
    )
}

render(<App />, document.getElementById("app"));

export default App;