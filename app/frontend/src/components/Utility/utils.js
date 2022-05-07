/**
 * Takes an array of different and combine them into one string to be placed in an element's class attribute.
 * @param  {...any} args an array of anything
 * @returns a joined string after filtering out non-strings from args
 */
function combineClasses(...args) {
  return args.filter((x) => typeof x === "string").join(" ");
}

/**
 * A wrapper which causes the parameter fuction to run only when the enter key is pressed
 * @param {function} fn a function to be wrapped
 * @returns a wrapped function that
 */
function onEnterKey(fn) {
  function wrapped(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      fn(e);
    }
  }

  return wrapped;
}

export { combineClasses, onEnterKey };
