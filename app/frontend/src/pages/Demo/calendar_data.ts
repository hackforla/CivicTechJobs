const daysOfWeek = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
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
