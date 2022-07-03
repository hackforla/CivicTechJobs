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
function onKey(fn: (e?: React.SyntheticEvent) => any, ...keyValues: string[]) {
  return (e: React.KeyboardEvent) => {
    if (keyValues.includes(e.key)) {
      e.preventDefault();
      fn(e);
    }
  };
}

export { combineClasses, onKey };
