/**
 * Static label data for the weekly Calendar component.
 *
 * `daysOfWeek` is a Sunday-first array of day names used as
 * column headers. `hoursOfDay()` returns 25 hour labels (12:00 AM
 * through 12:00 PM and back to 12:00 AM) used as row labels;
 * the trailing 12:00 AM is the closing edge of the 24-hour grid.
 */

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function hoursOfDay() {
  const arr = [];
  for (const meridiem of ["AM", "PM"]) {
    arr.push(`12:00 ${meridiem}`);
    for (let i = 1; i <= 11; i++) {
      arr.push(`${i}:00 ${meridiem}`);
    }
  }
  arr.push("12:00 AM");
  return arr;
}

export { daysOfWeek, hoursOfDay };
