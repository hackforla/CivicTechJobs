"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/shared/components/Buttons";
import { combineClasses } from "@/shared/lib/utils";

interface ClickCarouselProps {
  addClass?: string;
  hidden?: boolean;
  items: React.ReactElement[];
  selected?: number;
}

function ClickCarousel({
  addClass,
  hidden = false,
  items: initialItems,
  selected = 0,
}: ClickCarouselProps) {
  const [items, setItems] = useState<React.ReactElement[]>([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [index, setIndex] = useState(selected);

  useEffect(() => {
    setItems(initialItems);
    setLastIndex(initialItems.length - 1);
  }, [initialItems]);

  function handleClick(increase: boolean) {
    if (increase) {
      setIndex(index === lastIndex ? 0 : index + 1);
    } else {
      setIndex(index === 0 ? lastIndex : index - 1);
    }
  }

  return (
    <div
      className={combineClasses(
        "click-carousel",
        addClass,
        hidden ? "hidden" : "",
      )}
    >
      <Button size="icon-only" onClick={() => handleClick(false)}>
        &#8592;
      </Button>
      <Button size="icon-only" onClick={() => handleClick(true)}>
        &#8594;
      </Button>
      {items[index]}
    </div>
  );
}

export { ClickCarousel };
