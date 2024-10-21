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
      // Show left chevron if not at the start of the scrollable area
      setShowLeftChevron(scrollLeft !== 0);
      // Show right chevron if not at the end of the scrollable area
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
        // If at the end of the scrollable area, don't skip over a partially cut element
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
    <div className="whitespace-nowrap flex w-[1088px] h-[47px]">
      <button
        className={combineClasses(
          "bg-white px-[32px] py-0 cursor-pointer border-none justify-center",
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
        className="scroll-snap-x mandatory overflow-auto flex items-center gap-4 scrollbar-none"
      >
        {props.children}
      </div>
      <button
        className={combineClasses(
          "bg-white px-[32px] py-0 cursor-pointer border-none justify-center",
          showRightChevron ? undefined : "hidden"
        )}
        onClick={() => scrollMove("right")}
        aria-label="Scroll right"
      >
        <IconChevronRight />
      </button>
      <button className="flex items-center underline font-bold text-lg text-gray-700 ml-4 bg-transparent p-0 border-none cursor-pointer">Clear all</button>
    </div>
  );
}

export { ChevronScroll };
