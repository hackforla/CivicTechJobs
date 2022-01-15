import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { CopCard, InnerCopCard } from "./Cards/Cards";
import * as Images from "../assets/images/images";

function App() {
  return (
    <div style={{ margin: "10px" }}>
      <h1>Hello, World!</h1>
      <h2>Cards</h2>
      <div style={{ backgroundColor: "rgba(0,0,0,0.4)", padding: "20px 30px" }}>
        <CopCard hidden={false} size="lg">
          <InnerCopCard>
            <div className="title-3">COP Card - Not Mobile</div>
            <span className="red">
              Shrink your viewport to see this transition into the mobile
              version. Also, click the "x" button to see the card disappear.{" "}
            </span>
            {lorem}
          </InnerCopCard>
        </CopCard>
        <CopCard hidden={false} size="sm">
          <div className="title-4">COP Card - Mobile</div>
          <span className="red">
            Grow your viewport to see this transition into the non-mobile
            version. Also, click the "x" button to see the card disappear.{" "}
          </span>
          {lorem}
        </CopCard>
      </div>
      <hr></hr>
      <h2>Logos</h2>
      <img src={Images.LogoHorizontal} height="50"></img>
      <div>Horizontal</div>
      <br></br>
      <img src={Images.LogoMark} height="50"></img>
      <div>Logomark</div>
      <br></br>
      <img src={Images.LogoStacked} height="50"></img>
      <div>Stacked</div>
      <br></br>
      <img src={Images.LogoType} height="50"></img>
      <div>Logotype</div>
      <br></br>
      <img src={Images.LogoVertical} height="50"></img>
      <div>Vertical</div>
      <br></br>
      <img src={Images.LogoWordmark} height="50"></img>
      <div>Wordmark</div>
      <hr></hr>
      <h2>COP Icons</h2>
      <img src={Images.CopIconData} height="50"></img>
      <img src={Images.CopIconEngineering} height="50"></img>
      <img src={Images.CopIconOps} height="50"></img>
      <img src={Images.CopIconProduct} height="50"></img>
      <img src={Images.CopIconUiux} height="50"></img>
      <hr></hr>
      <h2>Majesticons</h2>
      <img src={Images.IconDownArrow} height="50"></img>
      <img src={Images.IconHamburgerMenu} height="50"></img>
      <img src={Images.IconX} height="50"></img>
      <hr></hr>
      <h2>Title Classes</h2>
      <div className="title-1">Title 1</div>
      <div className="title-2">Title 2</div>
      <div className="title-3">Title 3</div>
      <div className="title-4">Title 4</div>
      <div className="title-5">Title 5</div>
      <div className="title-6">Title 6</div>
      <div className="title-7">Title 7</div>
      <hr></hr>
      <h2>Paragraph Classes</h2>
      <div className="paragraph-1">Paragraph 1</div>
      <div className="paragraph-2">Paragraph 2</div>
      <div className="paragraph-3">Paragraph 3</div>
      <div className="paragraph-4">Paragraph 4</div>
      <div className="paragraph-5">Paragraph 5</div>
    </div>
  );
}

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

render(<App />, document.getElementById("app"));

export default App;
