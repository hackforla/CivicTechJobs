// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import "./_ScrollCarousel.scss";

// Note: This needs an aria labels to be compliant since it does not inherently use buttons but is nevetheless a click item. Or perhaps the entire scroll, even if hidden, is already compliant if there are labels on them????
function ScrollCarousel({ hidden = false, itemSize, totalMargins, ...props }) {
  const containerSize = window.innerWidth;
  const numItems = React.Children.count(props.children);
  const [scrollDif, edgeOffset, startLoss] = carouselOffset(
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
  const [tap, setTap] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    carouselRef.current.scroll({
      left: position,
      behavior: behavior,
    });
  }, [position]);

  function handleTouchStart(e) {
    if (!tap) {
      return;
    }
    const tapPoint = e.targetTouches[0].pageX;
    if (tapPoint <= edgeOffset) {
      if (position - scrollDif <= leftEdge) {
        setTimeout(() => {
          setBehavior("instant");
          setPosition(endPosition);
        }, 300);
      }
      setBehavior("smooth");
      setPosition(position - scrollDif);
    } else if (tapPoint >= containerSize - edgeOffset) {
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

  function handleScroll(e) {
    setTap(false);
    let timer;

    if (e.target.scrollLeft == position) {
      setTap(true);
    }

    timer = setTimeout(() => {
      setTap(true);
    }, 100);
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

  return [scrollDif, edgeOffset, startLoss];
}

function carouselPositionIndex(scrollDif, startLoss, index) {
  return scrollDif * index - startLoss;
}

export { ScrollCarousel };
