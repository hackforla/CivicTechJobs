"use client";

import React, { useCallback, useRef, useState } from "react";

import IconChevronLeft from "@/shared/icons/icon-chevron-left.svg";
import IconChevronRight from "@/shared/icons/icon-chevron-right.svg";
import { cn } from "@/shared/lib/utils";
import styles from "./ChevronScroll.module.css";

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
    <div className={styles.outerContainer}>
      <button
        className={cn(styles.leftBtn, !showLeftChevron && styles.hidden)}
        onClick={() => scrollMove("left")}
        aria-label="Scroll left"
      >
        <IconChevronLeft />
      </button>
      <div
        ref={scrollRef}
        onScroll={handleChevronVisibility}
        className={styles.childContainer}
      >
        {props.children}
      </div>
      <button
        className={cn(styles.rightBtn, !showRightChevron && styles.hidden)}
        onClick={() => scrollMove("right")}
        aria-label="Scroll right"
      >
        <IconChevronRight />
      </button>
      <button className={styles.clearBtn}>Clear all</button>
    </div>
  );
}

export { ChevronScroll };
