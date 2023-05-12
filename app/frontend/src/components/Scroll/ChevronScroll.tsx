import React, { useRef, useCallback } from "react";
import { IconChevronLeft, IconChevronRight } from "assets/images/images";

//scroll snap
//scroll box detect children components?

function ChevronScroll(props: React.PropsWithChildren<{}>) {
  const [showRightChevron, setShowRightChevron] = React.useState(true);
  const [showLeftChevron, setShowLeftChevron] = React.useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const position = e.currentTarget.scrollLeft;
    const maxScroll =
      e.currentTarget.scrollWidth - e.currentTarget.clientWidth - 1;

    if (position === 0) {
      console.log("Reached the start!");
      setShowLeftChevron(false);
    } else {
      setShowLeftChevron(true);
    }

    if (position >= maxScroll) {
      console.log("Reached the end!");
      setShowRightChevron(false);
    } else {
      setShowRightChevron(true);
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="chevron-scroll-container"
    >
      <div
        className="chevron-scroll-left-box"
        style={{ display: showLeftChevron ? "flex" : "none" }}
      >
        <IconChevronLeft className="chevron-scroll-right-icon" />
      </div>

      {props.children}

      <div
        className="chevron-scroll-right-box"
        onClick={() => console.log("clicked")}
        style={{ display: showRightChevron ? "flex" : "none" }}
      >
        <IconChevronRight className="chevron-scroll-right-icon" />
        <div className="chevron-scroll-clear-all">Clear all</div>
      </div>
    </div>
  );
}

export { ChevronScroll };
