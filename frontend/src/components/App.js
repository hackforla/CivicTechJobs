import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { Button } from "./Buttons/Buttons";
import * as Images from "../assets/images/images";

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <h2>Buttons</h2>
      <DivWrapper>
        <Button size="lg" color="primary" class="btn-md-to-sm">
          Log In
        </Button>
        <Button
          size="lg"
          color="primary-dark"
          class="btn-md-to-sm"
        >
          Log In
        </Button>
      </DivWrapper>
      <div>
        <span className="red text-center">
          These buttons uses button tags and are responsive! Resize your screen
          to see the breakpoints!
        </span>
      </div>
      <br></br>
      <br></br>
      <DivWrapper>
        <Button
          href="https://www.google.com/"
          length="long"
          color="primary"
          target="_blank"
        >
          Log In
        </Button>
        <Button
          href="https://www.google.com/"
          length="long"
          color="primary-dark"
          target="_blank"
        >
          Log In
        </Button>
      </DivWrapper>
      <div>
        <span className="red text-center">
          These long buttons uses a tags! Click them to open a new tab to Google.
        </span>
      </div>
      <br></br>
      <br></br>
      <DivWrapper>
        <Button
          href="https://www.google.com/"
          color="primary"
          target="_blank"
          disabled
        >
          Log In
        </Button>
        <Button
          href="https://www.google.com/"
          color="primary-dark"
          target="_blank"
          disabled
        >
          Log In
        </Button>
      </DivWrapper>
      <div>
        <span className="red text-center">
          These are regular versions of the second ones, but disabled.
        </span>
      </div>
      <br></br>
      <br></br>
      <DivWrapper>
        <Button size="icon" color="primary">
          &#128269;
        </Button>
        <Button size="icon" color="primary-dark">
          &#128269;
        </Button>
      </DivWrapper>
      <div>
        <span className="red text-center">
          These are icon buttons.
        </span>
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

function DivWrapper(props) {
  return (
    <Fragment>
      <div style={{ padding: "10px 0px" }}>{props.children[0]}</div>
      <div style={{ backgroundColor: "#030D2D", padding: "10px 0px" }}>
        {props.children[1]}
      </div>
    </Fragment>
  );
}

render(<App />, document.getElementById("app"));

export default App;
