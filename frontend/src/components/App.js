import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { Button } from "./Buttons/Buttons";
import * as Images from "../assets/images/images";

function App() {
  return (
    <div>
      <h1>Hi</h1>
      <ButtonShowcase>
        {
          ["sm", "md", "lg", "icon"].map((size, index) => {
            return <Button key={index} size={size} color='secondary' disabled>Donate</Button>
          })
        }
      </ButtonShowcase>
      <ButtonShowcase>
        {
          ["sm", "md", "lg", "icon"].map((size, index) => {
            return <Button href="" key={index} size={size} color='secondary'>Donate</Button>
          })
        }
      </ButtonShowcase>
      <ButtonShowcase>
        {
          ["sm", "md", "lg"].map((size, index) => {
            return <Button key={index} size={size} variant='long' color='primary'>Join Us</Button>
          })
        }
      </ButtonShowcase>
      <ButtonShowcase>
        {
          ["sm", "md", "lg"].map((size, index) => {
            return <Button key={index} size={size} color='primary' variant='long'>Join Us</Button>
          })
        }
      </ButtonShowcase>
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
      <br></br>
      <img src={Images.CopIconData} height="50"></img>
      <img src={Images.CopIconEngineering} height="50"></img>
      <img src={Images.CopIconOps} height="50"></img>
      <img src={Images.CopIconProduct} height="50"></img>
      <img src={Images.CopIconUiux} height="50"></img>
      <br></br>
      <div>COP Icons</div>
      <img src={Images.IconDownArrow} height="50"></img>
      <img src={Images.IconHamburgerMenu} height="50"></img>
      <img src={Images.IconX} height="50"></img>
      <br></br>
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

function ButtonShowcase(props) {
  return (
    <Fragment>
      {props.children}
      <div>
        <span className="red text-center">
          Change the browser window size to see the color change responsively,
        </span>{" "}
        while this does not change at all!
      </div>
      <br></br>
      <br></br>
    </Fragment>
  );
}

render(<App />, document.getElementById("app"));

export default App;
