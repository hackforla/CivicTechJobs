// External Imports
import React, { useState, useEffect, useRef } from "react";
// Internal Imports
import { combineClasses } from "../Utility/utils";
import { CarrotLeft, CarrotRight } from "assets/images/images";
import Chip from "./Chip";

interface ScrollProps extends React.PropsWithChildren {}

/*
    when you click on the left button, the options should move to the left. When you click on the right button, the options should move to the right. 
*/
function Scroll({ }: ScrollProps) { 
    return (
      <div className="scroll-bar">
        <div>
          <button className="scroll-chevron-button scroll-chevron-carrot-2">
            <img src={CarrotLeft} className="scroll-chevron-carrot" />
          </button>
        </div>
        <div id="scroll">
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
        </div>
        <div>
          <button className="scroll-chevron-button scroll-chevron-carrot">
            <img src={CarrotRight} className="scroll-chevron-carrot" />
          </button>
        </div>
      </div>
    );
}

export default Scroll;