// External Imports
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import {
  Dropdown,
  // DropdownOption,
  Calendar,
  IconButton,
  Button,
} from "components/components";
import { QualifierNav, QualifierTitle } from "./QualifierComponents";
// import { timezones } from "../../api_data/timezoneData";
import { iconArrowLeft } from "assets/images/images";
import { useQualifiersContext } from "context/QualifiersContext";

function QualifierPageCalendar() {
  const { qualifiers, updateQualifiers } = useQualifiersContext();
  // console.log(qualifiers.availabilityTimeSlots);

  const navigate = useNavigate();

  return (
    <Fragment>
      <QualifierTitle title="What is your weekly availability?">
        Drag to select.&nbsp;&nbsp;
        <span className="qcalendar-green-square"></span>
        &nbsp;=&nbsp;available
      </QualifierTitle>
      <TimeZoneDropDown />
      <Calendar
        value={qualifiers.availabilityTimeSlots}
        addClass="mt-5"
        onChange={(e) => {
          console.log(e);
          const newQualifiers = { ...qualifiers, availabilityTimeSlots: e };
          updateQualifiers(newQualifiers);
          // console.log(newQualifiers)
        }}
      />
      <QualifierNav addClass="justify-between">
        <IconButton
          label="previous page"
          iconUrl={iconArrowLeft}
          onClick={() => navigate("../1", { relative: "path" })}
        />
        <Button size="lg" length="long" color="primary" href="/">
          View available roles
        </Button>
      </QualifierNav>
    </Fragment>
  );
}

function TimeZoneDropDown() {
  // const [currentTimeZone, setCurrentTimeZone] = useState(0);

  // useEffect(() => {
  //   const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   for (const [index, zone] of timezones.entries()) {
  //     if (zone.utc.includes(userTz)) {
  //       setCurrentTimeZone(index);
  //       break;
  //     }
  //   }
  // }, []);

  return (
    <div className="qcalendar-dropdown flex-container justify-right">
      <Dropdown
        addClass="col-3 ovflow-hidden"
        ariaLabel="timezone-dropdown"
        // label="Your timezone:"
        label="Time Zone:"
        labelHidden={false}
        // value={timezones[currentTimeZone].text}
        value="Pacific Time/Los Angeles"
      >
        {/* {timezones.map((zone, index) => {
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
        })} */}
      </Dropdown>
    </div>
  );
}

export { QualifierPageCalendar };
