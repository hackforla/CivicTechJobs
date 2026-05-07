/**
 * Qualifier step 3: weekly availability calendar.
 *
 * Renders a timezone dropdown (auto-detected from
 * `Intl.DateTimeFormat`'s resolved timezone) and the drag-to-
 * select `Calendar` primitive. The user marks blocks of time
 * they're available across the week.
 *
 * Note: the Calendar's `onChange` is currently a `console.log`
 * placeholder; availability is not persisted to the qualifier
 * context. The "View available roles" button at the bottom links
 * to `/`, which is also a placeholder - the real "your matches"
 * page doesn't exist yet. Both are flagged as known-incomplete.
 */

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Button, IconButton } from "@/shared/components/Buttons";
import { Calendar } from "@/shared/components/Inputs/Calendar";
import { Dropdown, DropdownOption } from "@/shared/components/Inputs/Dropdown";
import Typography from "@/shared/components/Typography";
import IconArrowLeft from "@/shared/icons/icon-arrow-left.svg";

import { QualifierNav } from "./QualifierNav";
import styles from "./QualifierPageCalendar.module.css";
import { timezones } from "../data/timezoneData";

function QualifierPageCalendar() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <Typography.Title2 className={styles.title}>
        What is your weekly availability?
      </Typography.Title2>
      <Typography.Paragraph3 className={styles.legend}>
        Drag to select.&nbsp;&nbsp;
        <span className={styles.legendSwatch}></span>
        &nbsp;=&nbsp;available
      </Typography.Paragraph3>
      <TimeZoneDropDown />
      <Calendar
        addClass={styles.calendar}
        onChange={(e) => {
          console.log(e);
        }}
      />
      <QualifierNav>
        <IconButton
          label="previous page"
          Icon={IconArrowLeft}
          onClick={() => router.push("/qualifier/2")}
        />
        <Button size="large-long" href="/">
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
    <div className={styles.tzWrap}>
      <Dropdown
        addClass={styles.tzDropdown}
        ariaLabel="timezone-dropdown"
        label="Your timezone:"
        labelHidden={false}
        value={timezones[currentTimeZone].text}
      >
        {timezones.map((zone, index) => (
          <DropdownOption
            key={index}
            value={index}
            selected={
              timezones[index].value === timezones[currentTimeZone].value
            }
            onClick={(val) => {
              if (typeof val === "number") setCurrentTimeZone(val);
            }}
          >
            {zone.text}
          </DropdownOption>
        ))}
      </Dropdown>
    </div>
  );
}

export { QualifierPageCalendar };
