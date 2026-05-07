import type React from "react";
import { clsx, type ClassValue } from "clsx";

// Conditional className composer. CSS Modules don't have collision
// semantics the way Tailwind utilities did, so a plain clsx pass is
// sufficient. The `cn` alias is kept for ergonomic call sites.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const combineClasses = cn;

type Handler = (() => void) | React.EventHandler<React.SyntheticEvent>;

// Returns a keyboard handler that fires `fn` only when the pressed key
// matches one of `keyValues`. Calls `preventDefault` on the event.
export function onKey(fn: Handler, ...keyValues: string[]) {
  return (e: React.KeyboardEvent) => {
    if (keyValues.includes(e.key)) {
      e.preventDefault();
      (fn as React.EventHandler<React.SyntheticEvent>)(e);
    }
  };
}

// Inclusive integer range generator. Mirrors the MDN `Array.from` recipe.
export function range(start: number, stop: number, step: number = 1): number[] {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}
