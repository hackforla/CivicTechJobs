import React, { Component } from "react";
import { render } from "react-dom";

function App() {
    return (
        <div>
            <h1>Hi</h1>
            <div><span className="red">change the browser window size to see the color change responsively,</span> while this does not change at all!</div>
            <br></br>
            <div className="red">CivicTechJobs unites ambitious technology practitioners with volunteer opportunities from a central hub of listings to build digital products, programs, and services.</div>
            <div className="title-1">Title 1</div>
            <div className="title-2">Title 2</div>
            <div className="title-3">Title 3</div>
            <div className="title-4">Title 4</div>
            <div className="title-5">Title 5</div>
            <div className="title-6">Title 6</div>
            <div className="title-7">Title 7</div>
            <br></br>
            <div className="paragraph-1">Paragraph 1</div>
            <div className="paragraph-2">Paragraph 2</div>
            <div className="paragraph-3">Paragraph 3</div>
            <div className="paragraph-4">Paragraph 4</div>
            <div className="paragraph-5">Paragraph 5</div>
        </div>
    )
}

render(<App />, document.getElementById("app"));

export default App;
