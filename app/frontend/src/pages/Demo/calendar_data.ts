const daysOfWeek = [
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
];

function* hoursOfDay() {
  for (const meridiem of ["AM", "PM"]) {
    yield `12:00 ${meridiem}`;
    for (let i = 1; i <= 11; i++) {
      yield `${i}:00 ${meridiem}`;
    }
  }
  yield "12:00 AM";
}

export { daysOfWeek, hoursOfDay };
