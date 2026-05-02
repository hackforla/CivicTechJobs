/**
 * Small utility cluster used across components.
 *
 * `cn` is a clsx passthrough; it exists as a separate name so call
 * sites can swap it out later (e.g. for `tailwind-merge` if/when
 * Tailwind comes back) without touching every component. `onKey`
 * is a keyboard event filter for `onKeyDown` / `onKeyUp` handlers.
 * `range` is a numeric range generator for pagination, calendar
 * grids, and other index-based renders.
 */

import { clsx, type ClassValue } from "clsx";

import type React from "react";

/** Conditional className composer (clsx alias). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

type Handler = (() => void) | React.EventHandler<React.SyntheticEvent>;

/** Keyboard handler that fires `fn` only when one of `keyValues` is pressed. */
export function onKey(fn: Handler, ...keyValues: string[]) {
  return (e: React.KeyboardEvent) => {
    if (keyValues.includes(e.key)) {
      e.preventDefault();
      (fn as React.EventHandler<React.SyntheticEvent>)(e);
    }
  };
}

/** Inclusive integer range generator. */
export function range(start: number, stop: number, step: number = 1): number[] {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}
