import React, { Component } from "react";
import { render } from "react-dom";
import * as Images from "../assets/images/images";

function App() {
  return (
    <div>
      <h1>Hi</h1>
      <div>
        <span className="red text-center">
          Change the browser window size to see the color change responsively,
        </span>{" "}
        while this does not change at all!
      </div>
      <br></br>
      <img src={Images.LogoHorizontal} width="400"></img>
      <div>Horizontal</div>
      <br></br>
      <img src={Images.LogoMark} width="200"></img>
      <div>Logomark</div>
      <br></br>
      <img src={Images.LogoStacked} width="400"></img>
      <div>Stacked</div>
      <br></br>
      <img src={Images.LogoType} width="400"></img>
      <div>Logotype</div>
      <br></br>
      <img src={Images.LogoVertical} width="400"></img>
      <div>Vertical</div>
      <br></br>
      <img src={Images.LogoWordmark} width="400"></img>
      <div>Wordmark</div>
      <br></br>
      <img src={Images.CopIconData} width="100"></img>
      <img src={Images.CopIconEngineering} width="100"></img>
      <img src={Images.CopIconOps} width="100"></img>
      <img src={Images.CopIconProduct} width="100"></img>
      <img src={Images.CopIconUiux} width="100"></img>
      <div>COP Icons</div>
      <img src={Images.IconDownArrow} width="100"></img>
      <img src={Images.IconHamburgerMenu} width="100"></img>
      <img src={Images.IconX} width="100"></img>
      <div>Majesticons</div>
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
  );
}

render(<App />, document.getElementById("app"));

export default App;
