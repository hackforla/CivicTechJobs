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

/**
 * Calculates the scroll difference between items in a carousel, and the loss due to being the first item, which cannot be centered
 * @param {number} containerSize Size of the carousel, in px
 * @param {number} itemSize Size of an item in the carousel, in px
 * @param {number} totalMargins L+R Margins between carousel items, in px
 * @returns [number, number] The typical scroll difference, in px, from one item to another, and the loss of pixels due to being the first item being not inherently centered
 */
function carouselOffset(containerSize, itemSize, totalMargins) {
  const scrollDif = itemSize + totalMargins;
  const edgeOffset = (containerSize - itemSize) / 2;
  const startLoss = edgeOffset - totalMargins / 2;

  return [scrollDif, startLoss];
}

// Given scrollDif, startLoss, index
/**
 * Calculates the scroll position of an item in a carousel
 * @param {number} scrollDif The difference between two items in a carousel, in px
 * @param {number} startLoss The loss of pixels of the first item in a carousel
 * @param {number} index The index position of an item in a carousel
 * @returns number The exact scroll position of the item in index
 */
function carouselPositionIndex(scrollDif, startLoss, index) {
  return scrollDif * index - startLoss;
}

export { ScrollCarousel };
