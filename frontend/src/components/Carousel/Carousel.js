// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";

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
function carouselOffset(containerSize, itemSize, totalMargins) {
  const scrollDif = itemSize + totalMargins;
  const edgeOffset = (containerSize - itemSize) / 2;
  const startLoss = edgeOffset - totalMargins / 2;

  return [scrollDif, startLoss];
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
    if (tapPoint <= startLoss) {
      if (position - scrollDif <= leftEdge) {
        setTimeout(() => {
          setBehavior("instant");
          setPosition(endPosition);
        }, 300);
      }
      setBehavior("smooth");
      setPosition(position - scrollDif);
    } else if (tapPoint >= containerSize - startLoss) {
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

export { ClickCarousel, ScrollCarousel };
