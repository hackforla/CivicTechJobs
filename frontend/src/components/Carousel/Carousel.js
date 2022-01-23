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

// Given containe(px), itemSize(px), marginsLR(px), numItems, return scrollDif, startPosition
function carouselOffset(containerSize, itemSize, totalMargins, numItems) {
  const scrollDif = itemSize + totalMargins;
  const edgeOffset = (containerSize - itemSize) / 2;
  const startLoss = edgeOffset - totalMargins / 2;
  const startPosition = scrollDif * numItems - startLoss;

  return [scrollDif, startPosition, startLoss];
}

function carouselPositionIndex(scrollDif, startLoss, index) {
  return scrollDif * index - startLoss;
}

// Type declaration for props
ClickCarousel.propTypes = {
  addClass: PropTypes.string,
  hidden: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.element),
  selected: PropTypes.number,
};

function ScrollCarousel({ hidden = false, itemSize, totalMargins, ...props }) {
  const containerSize = window.innerWidth;
  const numItems = React.Children.count(props.children);
  const [scrollDif, startPosition, startLoss] = carouselOffset(
    containerSize,
    itemSize,
    totalMargins,
    numItems
  );
  const leftEdge = carouselPositionIndex(scrollDif, startLoss, numItems - 1);
  const rightEdge = carouselPositionIndex(scrollDif, startLoss, 2 * numItems);
  const fullRotation = scrollDif * numItems;

  const [position, setPosition] = useState(startPosition);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    console.log(position);
  }, [position]);

  //if swipe detected, go to the next position, depending on swipe direction, requires ref to set the position
  function handleTouchStart(e) {
    setTouchStartX(e.targetTouches[0].pageX);
  }

  function handleTouchMove(e) {
    setTouchEndX(e.targetTouches[0].pageX);
  }

  function handleTouchEnd(e) {
    if (touchEndX > touchStartX) {
      setPosition(position - scrollDif);
    } else if (touchEndX < touchStartX) {
      setPosition(position + scrollDif);
    }
  }

  function handleScroll(e) {
    const currentPosition = e.target.scrollLeft;
    var atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0;
    var timeOut = atSnappingPoint ? 0 : 150; //see notes

    // https://stackoverflow.com/a/66029649
    // once Mozilla supports it, use: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
    clearTimeout(e.target.scrollTimeout);
    e.target.scrollTimeout = setTimeout(function () {
      if (currentPosition >= rightEdge) {
        e.target.scrollLeft = currentPosition - fullRotation;
      } else if (currentPosition <= leftEdge) {
        e.target.scrollLeft = currentPosition + fullRotation;
      }
      setPosition(e.target.scrollLeft);
    }, timeOut);
  }

  return (
    <Fragment>
      <div
        className={combineClasses(
          "scroll-carousel",
          props.addClass,
          hidden ? "hidden" : ""
        )}
        onScroll={(e) => handleScroll(e)}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={(e) => handleTouchEnd(e)}
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
ScrollCarousel.propTypes = {
  addClass: PropTypes.string,
  hidden: PropTypes.bool,
  itemSize: PropTypes.number.isRequired,
  totalMargins: PropTypes.number.isRequired,
};

export { ClickCarousel, ScrollCarousel };
