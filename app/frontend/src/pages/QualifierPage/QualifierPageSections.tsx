// External Imports
import React, { Fragment, useEffect, useState } from "react";

// Internal Imports
import {
  Dropdown,
  DropdownOption,
  Calendar,
  IconButton,
  Button,
} from "components/components";
import { timezones } from "./timezone_data";
import { iconArrowLeft } from "assets/images/images";

interface QualifierTitleProps {
  children: React.ReactNode;
  title: string;
}

function QualifierTitle({ children, title }: QualifierTitleProps) {
  return (
    <Fragment>
      <h1 className="title-2 mt-6">{title}</h1>
      <p className="paragraph-1 row justify-center mt-3">{children}</p>
    </Fragment>
  );
}

function CalendarContent() {
  return (
    <Fragment>
      <TimeZoneDropDown />
      <Calendar
        addClass="mt-5"
        onChange={(e) => {
          console.log(e);
        }}
      />
    </Fragment>
  );
}

function ContentNav() {
  return (
    <div className="flex-center-y qcalendar-nav px-3">
      <IconButton
        label="previous page"
        iconUrl={iconArrowLeft}
        onClick={() => console.log("going back to previous page")}
      />
      <Button size="lg" length="long" color="primary" href="./demo">
        View available roles
      </Button>
    </div>
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
    <div className="qcalendar-dropdown flex-container justify-right">
      <Dropdown
        addClass="col-3 ovflow-hidden"
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
    </div>
  );
}
