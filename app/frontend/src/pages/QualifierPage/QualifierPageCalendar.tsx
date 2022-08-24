// External Imports
import React, { Fragment, useEffect, useState } from "react";

// Internal Imports
import {
  Dropdown,
  DropdownOption,
  Calendar,
  IconButton,
} from "components/components";
import { timezones } from "./timezone_data";

function QualifierPageCalendar() {
  return (
    <div className="flex-column align-center">
      <Title />
      <TimeZoneDropDown />
    </div>
  );
}

function Title() {
  return (
    <Fragment>
      <h2 className="title-2 mt-6">What is your weekly availability?</h2>
      <p className="paragraph-1 row justify-center mt-3">
        Drag to select.&nbsp;&nbsp;
        <div className="calendar-page-green-square"></div>&nbsp;=&nbsp;available
      </p>
    </Fragment>
  );
}

function TimeZoneDropDown() {
  const [currentTimeZone, setCurrentTimeZone] = useState(0);

  useEffect(() => {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    for (const [index, zone] of timezones.entries()) {
      if (zone.utc.includes(userTz)) {
        setCurrentTimeZone(index);
        break;
      }
    }
  }, []);
  return (
    <Dropdown
      addClass="calendar-page-dropdown"
      ariaLabel="timezone-dropdown"
      label="Your timezone:"
      labelHidden={false}
      value={timezones[currentTimeZone].text}
    >
      {timezones.map((zone, index) => {
        return (
          <DropdownOption
            key={index}
            value={index}
            selected={
              timezones[index].value == timezones[currentTimeZone].value
            }
            onClick={(val) => {
              if (typeof val === "number") setCurrentTimeZone(val);
            }}
          >
            {zone.text}
          </DropdownOption>
        );
      })}
    </Dropdown>
  );
}

export { QualifierPageCalendar };
