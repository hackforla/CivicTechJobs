// External Imports
import React, { useState, useEffect, useRef } from "react";
// Internal Imports
import { combineClasses } from "../Utility/utils";
import { CarrotLeft, CarrotRight } from "assets/images/images";
import Chip from "./Chip";

/*
    when you click on the left button, the options should move to the left. When you click on the right button, the options should move to the right. 
*/
function Scroll() {
  const scrollElement = useRef(null);
  const [showRight, setShowRight] = useState(true);
  const [showLeft, setShowLeft] = useState(true);

  const scrollLeft = (offset: number) => {
    var maxScrollLeft =
      scrollElement.current.scrollWidth - scrollElement.current.clientWidth;
    scrollElement.current.scrollLeft += offset;
    if (Math.ceil(scrollElement.current.scrollLeft) >= maxScrollLeft) {
      setShowRight(false);
      setShowLeft(true);
    }
    if (scrollElement.current.scrollLeft <= 0 && offset === -20) {
      setShowRight(true);
      setShowLeft(false);
    }
    if (
      scrollElement.current.scrollLeft > 0 &&
      Math.ceil(scrollElement.current.scrollLeft) < maxScrollLeft
    ) {
      setShowRight(true);
      setShowLeft(true);
    }
  };

  return (
    <div className="scroll-bar">
      {showLeft ? (
        <button
          className="scroll-chevron-button"
          onClick={() => scrollLeft(-20)}
        >
          <img
            src={CarrotLeft}
            className="scroll-chevron-carrot-2"
            alt="carrot-left"
          />
        </button>
      ) : null}

      <div className="ScrollMenu" ref={scrollElement}>
        <Chip>
          <p>Roles</p>
        </Chip>
        <Chip>
          <p>Availability</p>
        </Chip>
        <Chip>
          <p>Experience Level</p>
        </Chip>
        <Chip>
          <p>Program Areas</p>
        </Chip>
        <Chip>
          <p>Languages/Technologies</p>
        </Chip>
      </div>
      {showRight ? (
        <button
          className="scroll-chevron-button"
          onClick={() => scrollLeft(+20)}
        >
          <img
            src={CarrotRight}
            className="scroll-chevron-carrot-2"
            alt="carrot-right"
          />
        </button>
      ) : null}
    </div>
  );
}

export default Scroll;

{
  /* <div id="scroll-bar">
        <button
          className="scroll-chevron-button scroll-chevron-carrot-2"
          onClick={() => scroll(-20)}
        >
          <img src={CarrotLeft} className="scroll-chevron-carrot" />
        </button>
        <div id="scroll" ref={reff}>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
          <Chip>{"Hello"}</Chip>
        </div>
        <button
          className="scroll-chevron-button scroll-chevron-carrot-2"
          onClick={() => scroll(+20)}
        >
          <img src={CarrotRight} className="scroll-chevron-carrot" />
        </button>
      </div> */
}
