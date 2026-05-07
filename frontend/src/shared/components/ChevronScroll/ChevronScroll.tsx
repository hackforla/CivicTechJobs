"use client";

import React, { useCallback, useRef, useState } from "react";

import IconChevronLeft from "@/shared/icons/icon-chevron-left.svg";
import IconChevronRight from "@/shared/icons/icon-chevron-right.svg";
import { combineClasses } from "@/shared/lib/utils";

function ChevronScroll(props: { children: React.ReactNode }) {
  const [showRightChevron, setShowRightChevron] = useState(true);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [childIndex, setChildIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleChevronVisibility = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
      const maxScroll = scrollWidth - clientWidth - 1;
      setShowLeftChevron(scrollLeft !== 0);
      setShowRightChevron(scrollLeft < maxScroll);
    },
    [],
  );

  const scrollMove = (direction: string) => {
    if (!scrollRef.current) return;
    const { children } = scrollRef.current;
    if (direction === "right") {
      scrollRef.current.scrollBy({
        left: children[childIndex].scrollWidth,
        behavior: "smooth",
      });
      setChildIndex(childIndex + 1);
    } else if (direction === "left") {
      if (!showRightChevron) {
        scrollRef.current.scrollBy({ left: -1, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({
          left: -children[childIndex - 1].scrollWidth,
          behavior: "smooth",
        });
      }
      setChildIndex(childIndex - 1);
    }
  };

  return (
    <div className="chevron-scroll-outer-container">
      <button
        className={combineClasses(
          "chevron-scroll-left-btn",
          "align-center",
          "justify-center",
          "row",
          showLeftChevron ? undefined : "hidden",
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
          "align-center",
          "row",
          showRightChevron ? undefined : "hidden",
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
