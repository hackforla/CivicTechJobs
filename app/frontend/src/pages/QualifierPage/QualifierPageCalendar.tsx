// External Imports
import React, { useEffect, useState } from "react";

// Internal Imports
import {
  Dropdown,
  DropdownOption,
  Calendar,
  IconButton,
  Button,
} from "components/components";
import { QualifierNav, QualifierTitle } from "./QualifierComponents";
import { timezones } from "../api_data/timezone_data";
import { iconArrowLeft } from "assets/images/images";

interface QualifierPageCalendarProps {
  setPage: (num: number) => void;
}

function QualifierPageCalendar({ setPage }: QualifierPageCalendarProps) {
  return (
    <div className="flex-center-x">
      <div className="flex-column qcalendar-content align-center px-5">
        <QualifierTitle title="What is your weekly availability?">
          Drag to select.&nbsp;&nbsp;
          <span className="qcalendar-green-square"></span>
          &nbsp;=&nbsp;available
        </QualifierTitle>
        <TimeZoneDropDown />
        <Calendar
          addClass="mt-5"
          onChange={(e) => {
            console.log(e);
          }}
        />
        <QualifierNav addClass="qcalendar-nav">
          <IconButton
            label="previous page"
            iconUrl={iconArrowLeft}
            onClick={() => setPage(1)}
          />
          <Button size="lg" length="long" color="primary" href="./demo">
            View available roles
          </Button>
        </QualifierNav>
      </div>
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

export { QualifierPageCalendar };
