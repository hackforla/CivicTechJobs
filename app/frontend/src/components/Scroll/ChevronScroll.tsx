import React, { useRef, useCallback } from "react";
import { IconChevronLeft, IconChevronRight } from "assets/images/images";

//scroll snap

function ChevronScroll(props: React.PropsWithChildren<{}>) {
  const [showRightChevron, setShowRightChevron] = React.useState(true);
  const [showLeftChevron, setShowLeftChevron] = React.useState(false);
  const [childIndex, setChildIndex] = React.useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleChevronVisibility = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const scrollPosition = e.currentTarget.scrollLeft;
      const maxScroll =
        e.currentTarget.scrollWidth - e.currentTarget.clientWidth - 1;

      // show left chevron if not at start
      if (scrollPosition === 0) {
        setShowLeftChevron(false);
      } else {
        setShowLeftChevron(true);
      }
      //show right chevron if not at end
      if (scrollPosition >= maxScroll) {
        setShowRightChevron(false);
      } else {
        setShowRightChevron(true);
      }
    },
    []
  );

  // Move the scroll bar left or right by the width of each child
  const scrollMove = (direction: string) => {
    if (scrollRef.current) {
      if (direction === "right") {
        const scrollChildren = Array.from(scrollRef.current.children);
        scrollRef.current.scrollLeft += scrollChildren[childIndex].scrollWidth;
        setChildIndex(childIndex + 1);

        //might need to fix left scroll somehow for the comeback after max scroll
      } else if (direction === "left") {
        scrollRef.current.scrollLeft -=
          scrollRef.current.children[childIndex - 1].scrollWidth;
        setChildIndex(childIndex - 1);
      }
    }
  };

  const clearAllBtn = <div className="chevron-scroll-clear-all">Clear all</div>;

  return (
    <div className="chevron-scroll-outer-container">
      <div
        className="chevron-scroll-left-box"
        onClick={() => scrollMove("left")}
        style={{ display: showLeftChevron ? "flex" : "none" }}
      >
        <IconChevronLeft />
      </div>
      <div
        ref={scrollRef}
        onScroll={handleChevronVisibility}
        className="chevron-scroll-inner-container"
      >
        {props.children}
        {clearAllBtn}
      </div>
      <div
        className="chevron-scroll-right-box"
        style={{ display: showRightChevron ? "flex" : "none" }}
      >
        <div
          className="chevron-scroll-right-icon-box"
          onClick={() => scrollMove("right")}
        >
          <IconChevronRight />
        </div>

        {clearAllBtn}
      </div>
    </div>
  );
}

export { ChevronScroll };
