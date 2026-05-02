"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";
import styles from "./ScrollCarousel.module.css";

interface ScrollCarouselProps extends React.PropsWithChildren {
  addClass?: string;
  hidden?: boolean;
  itemSize: number;
  totalMargins: number;
}

// Mimics scroll-snap-stop: always behavior, which Firefox does not support.
// `containerSize` is read from `window.innerWidth` lazily inside useEffect so
// the component is safe to render under React Server Components - the legacy
// version dereferenced `window` at module init and would have crashed under
// SSR.
function ScrollCarousel({
  addClass,
  hidden = false,
  itemSize: initialItemSize,
  totalMargins,
  children,
}: ScrollCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const numItems = React.Children.count(children);

  const [containerSize, setContainerSize] = useState(0);
  const [itemSize, setItemSize] = useState(initialItemSize);
  const [position, setPosition] = useState(0);
  const [behavior, setBehavior] = useState<ScrollBehavior>("instant");
  const [touch, setTouch] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [index, setIndex] = useState(numItems);

  const [scrollDif, startLoss] = carouselOffset(
    containerSize,
    itemSize,
    totalMargins,
  );
  const leftEdge = carouselPositionIndex(scrollDif, startLoss, numItems - 1) + 1;
  const rightEdge = carouselPositionIndex(scrollDif, startLoss, 2 * numItems) - 1;
  const startPosition = carouselPositionIndex(scrollDif, startLoss, numItems);
  const endPosition = carouselPositionIndex(
    scrollDif,
    startLoss,
    2 * numItems - 1,
  );

  useEffect(() => {
    setContainerSize(window.innerWidth);
    const onResize = () => {
      setContainerSize(window.innerWidth);
      const firstChild = carouselRef.current?.children[0] as
        | HTMLElement
        | undefined;
      if (firstChild) setItemSize(firstChild.offsetWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setPosition(carouselPositionIndex(scrollDif, startLoss, index));
  }, [index, scrollDif, startLoss]);

  useEffect(() => {
    carouselRef.current?.scroll({ left: position, behavior });
  }, [position, behavior]);

  function handleTouchStart(e: React.TouchEvent) {
    setTouch(true);
    setTouchStartX(e.targetTouches[0].pageX);
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!touch || touchStartX == null) return;
    const tapDiff = e.targetTouches[0].pageX - touchStartX;
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
      className={cn(styles.carousel, addClass, hidden && styles.hidden)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={carouselRef}
    >
      {children}
      {children}
      {children}
    </div>
  );
}

function carouselOffset(
  containerSize: number,
  itemSize: number,
  totalMargins: number,
): [number, number] {
  const scrollDif = itemSize + totalMargins;
  const edgeOffset = (containerSize - itemSize) / 2;
  const startLoss = edgeOffset - totalMargins / 2;
  return [scrollDif, startLoss];
}

function carouselPositionIndex(
  scrollDif: number,
  startLoss: number,
  index: number,
): number {
  return scrollDif * index - startLoss;
}

export { ScrollCarousel };
