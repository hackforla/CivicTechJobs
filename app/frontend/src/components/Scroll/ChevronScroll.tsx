import React, { useRef, useCallback } from "react";
import { IconChevronLeft, IconChevronRight } from "assets/images/images";
import { combineClasses } from "components/Utility/utils";

function ChevronScroll(props: React.PropsWithChildren<{}>) {
  const [showRightChevron, setShowRightChevron] = React.useState(true);
  const [showLeftChevron, setShowLeftChevron] = React.useState(false);
  const [childIndex, setChildIndex] = React.useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleChevronVisibility = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
      const maxScroll = scrollWidth - clientWidth - 1;
      // show left chevron if not at start of scrollable area
      setShowLeftChevron(scrollLeft !== 0);
      //show right chevron if not at end of scrollable area
      setShowRightChevron(scrollLeft < maxScroll);
    },
    []
  );

  const scrollMove = (direction: string) => {
    if (scrollRef.current) {
      const { children } = scrollRef.current;
      // Move the scroll bar left or right by the width of each child element
      if (direction === "right") {
        scrollRef.current.scrollBy({
          left: children[childIndex].scrollWidth,
          behavior: "smooth",
        });
        setChildIndex(childIndex + 1);
      } else if (direction === "left") {
        // if at end of scrollable area, don't want to skip over partially cut element
        if (!showRightChevron) {
          scrollRef.current.scrollBy({
            left: -1,
            behavior: "smooth",
          });
        } else {
          scrollRef.current.scrollBy({
            left: -children[childIndex - 1].scrollWidth,
            behavior: "smooth",
          });
        }
        setChildIndex(childIndex - 1);
      }
    }
  };

  return (
    <div className="chevron-scroll-outer-container">
      <button
        className={combineClasses(
          "chevron-scroll-left-btn",
          showLeftChevron ? undefined : "hidden"
        )}
        onClick={() => scrollMove("left")}
        aria-label="Scroll left"
      >
        <IconChevronLeft />
      </button>
      <div
        ref={scrollRef}
        onScroll={handleChevronVisibility}
        className="chevron-scroll-child-container"
      >
        {props.children}
      </div>
      <button
        className={combineClasses(
          "chevron-scroll-right-btn",
          showRightChevron ? undefined : "hidden"
        )}
        onClick={() => scrollMove("right")}
        aria-label="Scroll right"
      >
        <IconChevronRight />
      </button>
      <button className="chevron-scroll-clear-btn">Clear all</button>
    </div>
  );
}

export { ChevronScroll };
