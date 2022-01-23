// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import { Button } from "../Buttons/Buttons";
import "./_Carousel.scss";

function ClickCarousel({ hidden = false, selected = 0, ...props }) {
  const [items, setItems] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [index, setIndex] = useState(selected);
  const [isHidden, setHidden] = useState(hidden);

  useEffect(() => {
    setItems(props.items);
    setLastIndex(props.items.length - 1);
  }, [props.items]);

  function handleClick(increase) {
    if (increase) {
      console.log("clicked");
      if (index == lastIndex) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    } else {
      if (index == 0) {
        setIndex(lastIndex);
      } else {
        setIndex(index - 1);
      }
    }
  }

  return (
    <div
      className={combineClasses(
        "click-carousel",
        props.addClass,
        isHidden ? "hidden" : ""
      )}
    >
      <Button size="icon" onClick={() => handleClick(false)}>
        &#8592;
      </Button>
      <Button size="icon" onClick={() => handleClick(true)}>
        &#8594;
      </Button>
      {items ? items[index] : ""}
    </div>
  );
}

// Given screenSize(px), itemSize(px), marginsLR(px), numItems, return scrollDif, startPosition
function carouselOffset(screenWidth, itemSize, totalMargins, numItems) {
  const scrollDif = itemSize + totalMargins;
  const edgeOffset = (screenWidth - itemSize) / 2
  const startLoss = edgeOffset - (totalMargins / 2)
  const startPosition = scrollDif * numItems - startLoss;

  return [scrollDif, startPosition]
}

function ScrollCarousel({ hidden = false, itemSize, totalMargins, ...props }) {
  const screenSize = window.innerWidth
  const numChildren = React.Children.count(props.children)
  

  const size = 328;
  const rightEdge = 3280; // a 0
  const leftEdge = 1312; // at 4
  const fullRotation = 1640;
  const [position, setPosition] = useState(1616);
  const [isTouchOn, setIsTouchOn] = useState(true);

  function handleScroll(e) {
    const currentPosition = e.target.scrollLeft;
    var atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0;
    var timeOut = atSnappingPoint ? 0 : 150; //see notes

    // https://stackoverflow.com/a/66029649
    // once Mozilla supports it, use: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
    /*clearTimeout(e.target.scrollTimeout);
    e.target.scrollTimeout = setTimeout(function () {
      if (currentPosition >= rightEdge) {
        e.target.scrollLeft = currentPosition - fullRotation;
      } else if (currentPosition <= leftEdge) {
        e.target.scrollLeft = currentPosition + fullRotation;
      }
      setPosition(e.target.scrollLeft);
    }, timeOut);*/
    setPosition(e.target.scrollLeft)
  }

  return (
    <Fragment>
      <div
        className={combineClasses(
          "scroll-carousel",
          props.addClass,
          isTouchOn ? "" : "disable-touch",
          hidden ? "hidden" : ""
        )}
        onScroll={(e) => handleScroll(e)}
      >
        {props.children}
        {props.children}
        {props.children}
      </div>
      <div>{position}</div>
    </Fragment>
  );
}

// Type declaration for props
ClickCarousel.propTypes = {
  addClass: PropTypes.string,
  hidden: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.element),
  selected: PropTypes.number,
};

ScrollCarousel.propTypes = {
  addClass: PropTypes.string,
  hidden: PropTypes.bool,
};

export { ClickCarousel, ScrollCarousel };
