// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import "./_ScrollCarousel.scss";

function ScrollCarousel({ hidden = false, itemSize, totalMargins, ...props }) {
  const containerSize = window.innerWidth;
  const numItems = React.Children.count(props.children);
  const [scrollDif, startLoss] = carouselOffset(
    containerSize,
    itemSize,
    totalMargins
  );
  // Note: the +/- one offset accounts for floating points
  const leftEdge =
    carouselPositionIndex(scrollDif, startLoss, numItems - 1) + 1;
  const rightEdge =
    carouselPositionIndex(scrollDif, startLoss, 2 * numItems) - 1;
  const startPosition = carouselPositionIndex(scrollDif, startLoss, numItems);
  const endPosition = carouselPositionIndex(
    scrollDif,
    startLoss,
    2 * numItems - 1
  );

  const [position, setPosition] = useState(startPosition);
  const [behavior, setBehavior] = useState("instant");
  const [touch, setTouch] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    carouselRef.current.scroll({
      left: position,
      behavior: behavior,
    });
  }, [position]);

  function handleTouchStart(e) {
    setTouch(true);
    setTouchStartX(e.targetTouches[0].pageX);
  }

  function handleTouchMove(e) {
    const tapDiff = e.targetTouches[0].pageX - touchStartX;
    if (!touch) {
      return;
    }
    if (tapDiff > 40) {
      setTouch(false);
      if (position - scrollDif <= leftEdge) {
        setTimeout(() => {
          setBehavior("instant");
          setPosition(endPosition);
        }, 300);
      }
      setBehavior("smooth");
      setPosition(position - scrollDif);
    } else if (tapDiff < -40) {
      setTouch(false);
      if (position + scrollDif >= rightEdge) {
        setTimeout(() => {
          setBehavior("instant");
          setPosition(startPosition);
        }, 300);
      }
      setBehavior("smooth");
      setPosition(position + scrollDif);
    }
  }

  function handleTouchEnd() {
    setTouch(true);
  }

  return (
    <Fragment>
      <div
        className={combineClasses(
          "scroll-carousel",
          props.addClass,
          hidden ? "hidden" : ""
        )}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={() => handleTouchEnd()}
        ref={carouselRef}
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

// Given containe(px), itemSize(px), marginsLR(px), numItems, return scrollDif, startPosition
function carouselOffset(containerSize, itemSize, totalMargins) {
  const scrollDif = itemSize + totalMargins;
  const edgeOffset = (containerSize - itemSize) / 2;
  const startLoss = edgeOffset - totalMargins / 2;

  return [scrollDif, startLoss];
}

function carouselPositionIndex(scrollDif, startLoss, index) {
  return scrollDif * index - startLoss;
}

export { ScrollCarousel };
