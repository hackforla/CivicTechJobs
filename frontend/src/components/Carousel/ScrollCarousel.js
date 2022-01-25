// External Imports
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import "./_ScrollCarousel.scss";

// Note, all the functions in this component mimics the expected behavior of scroll-snap-stop: always. Since this is not supported in FireFox, this needs to be recreated until support is reached.
function ScrollCarousel({ hidden = false, itemSize, totalMargins, ...props }) {
  const containerSize = window.innerWidth;
  const numItems = React.Children.count(props.children);
  const [scrollDif, startLoss] = carouselOffset(
    containerSize,
    itemSize,
    totalMargins
  );
  // Note: the +/- one offset for the edges accounts for floating point discrepencies
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

  useEffect(() => {
    // when the item size changes, reset position to where it should be, based on the item index
    setPosition(carouselPositionIndex(scrollDif, startLoss, index));
  }, [props.itemSize, startPosition]);

  const [position, setPosition] = useState(startPosition);
  const [behavior, setBehavior] = useState("instant");
  const [touch, setTouch] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [index, setIndex] = useState(numItems);
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
          setIndex(2 * numItems - 1);
        }, 300);
      }
      setBehavior("smooth");
      setPosition(position - scrollDif);
      setIndex(index - 1);
    } else if (tapDiff < -40) {
      setTouch(false);
      if (position + scrollDif >= rightEdge) {
        setTimeout(() => {
          setBehavior("instant");
          setPosition(startPosition);
          setIndex(numItems);
        }, 300);
      }
      setBehavior("smooth");
      setPosition(position + scrollDif);
      setIndex(index + 1);
    }
  }

  function handleTouchEnd() {
    setTouch(true);
  }

  return (
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
