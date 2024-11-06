import React from "react";

/**
 * Takes an array of different and combine them into one string to be placed in an element's class attribute.
 * @param  {...any} args an array of anything
 * @returns a joined string after filtering out non-strings from args
 */
function combineClasses(...args: any[]) {
  return args.filter((x) => typeof x === "string").join(" ");
}

/**
 * A wrapper function that takes in a function and any number of strings denoting key values. When the key is passed as part of a browser event, the function is run if the key passed in matches the key value.
 * @param {*} fn a function that is called after a key is pressed
 * @param  {...string[]} keyValues strings denoting key values
 * @returns a function that runs only when the event key passed in matches any of the keyValues
 */
function onKey(fn: React.EventHandler<any>, ...keyValues: string[]) {
  return (e: React.KeyboardEvent) => {
    if (keyValues.includes(e.key)) {
      e.preventDefault();
      fn(e);
    }
  };
}

// Credit to mdn documentation for the function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
function range(start: number, stop: number, step: number = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}

export { combineClasses, onKey, range };
