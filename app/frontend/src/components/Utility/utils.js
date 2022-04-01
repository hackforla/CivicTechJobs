/**
 * Takes an array of different and combine them into one string to be placed in an element's class attribute.
 * @param  {...any} args an array of anything
 * @returns a joined string after filtering out non-strings from args
 */
function combineClasses(...args) {
  return args.filter((x) => typeof x === "string").join(" ");
}

export { combineClasses };
