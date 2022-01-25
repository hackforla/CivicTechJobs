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

// Type declaration for props
ClickCarousel.propTypes = {
  addClass: PropTypes.string,
  hidden: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.element),
  selected: PropTypes.number,
};

export { ClickCarousel };
