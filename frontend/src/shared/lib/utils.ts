import type React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Class composer that resolves Tailwind class collisions (later wins).
// Preferred over `combineClasses` for new code; the latter is kept for
// the SCSS-class consumers that don't need Tailwind merge semantics.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Joins arbitrary inputs into a className string, filtering out anything
// that isn't a string. Used by the legacy SCSS components.
export function combineClasses(
  ...args: (string | boolean | undefined)[]
): string {
  return args.filter((x) => typeof x === "string").join(" ");
}

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
