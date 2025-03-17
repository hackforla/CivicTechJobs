// External Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import Typography from "tw-components/Typography";
import {
  Dropdown,
  DropdownOption,
  Calendar,
  IconButton,
  Button,
} from "components/components";
import { QualifierNav } from "./components/QualifierNav";
import { timezones } from "../../api_data/timezoneData";
import { iconArrowLeft } from "assets/images/images";
// import { useQualifiersContext } from "context/QualifiersContext";

function QualifierPageCalendar() {
  // const {qualifiers} = useQualifiersContext();
  // console.log(qualifiers);
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center px-5">
      <Typography.Title2 className="mt-8 text-charcoal">
        What is your weekly availability?
      </Typography.Title2>
      <Typography.Paragraph3 className="my-5 text-grey-dark">
        Drag to select.&nbsp;&nbsp;
        <span className="inline-block size-6 rounded-sm bg-green leading-8"></span>
        &nbsp;=&nbsp;available
      </Typography.Paragraph3>
      <TimeZoneDropDown />
      <Calendar
        addClass="mt-5"
        onChange={(e) => {
          console.log(e);
        }}
      />
      <QualifierNav className="justify-between">
        <IconButton
          label="previous page"
          iconUrl={iconArrowLeft}
          onClick={() => navigate("../2", { relative: "path" })}
        />
        <Button size="lg" length="long" color="primary" href="/">
          View available roles
        </Button>
      </QualifierNav>
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
    <div className="flex w-full flex-wrap justify-end">
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
