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
