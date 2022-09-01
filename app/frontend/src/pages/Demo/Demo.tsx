// @ts-nocheck
// External Imports
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import {
  Checkbox,
  Dropdown,
  TextField,
  ProgressBar,
  Calendar,
  IconButton,
} from "components/components";
import {
  IconEyeClose,
  IconEyeOpen,
  IconSearch,
  iconArrowLeft,
} from "assets/images/images";
import { DropdownOption } from "components/Inputs/Dropdown";
import { timezones } from "../QualifierPage/timezone_data";

function Demo() {
  const [activePage, setActivePage] = useState(1);
  const [currentTimeZone, setCurrentTimeZone] = useState(0);
  const [calendarData, setCalendarData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    for (const [index, zone] of timezones.entries()) {
      if (zone.utc.includes(tz)) {
        setCurrentTimeZone(index);
        break;
      }
    }
  }, []);

  function textFieldOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function checkboxOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked);
  }

  function calendarOnChange(data: string) {
    console.log(data);
    setCalendarData(data);
  }

  return (
    <Fragment>
      <div className="flex-container">
        <div className="col-3 box"></div>
        <div className="col-3 box"></div>
        <div className="col-3 box"></div>
        <div className="col-3 box"></div>
      </div>
      <div className="m-5"></div>
      <div className="m-5">
        <h1>
          Hello World! Feel free to use this page as a playground to test code!
        </h1>
        <h2>Calendar</h2>
        {calendarData ? (
          <Calendar value={calendarData} onChange={calendarOnChange} />
        ) : (
          <Calendar onChange={calendarOnChange} />
        )}
        <h2>Progress Bar</h2>
        <div>
          <ProgressBar addClass="my-2" value={1} label="page #" />
          <ProgressBar addClass="my-2" label="page #" />
          <ProgressBar addClass="my-2" value={2} max={3} label="page #" />
        </div>
        <div className="my-2">
          <button onClick={() => setActivePage(1)}>Page 1</button>
          <button onClick={() => setActivePage(2)}>Page 2</button>
          <button onClick={() => setActivePage(3)}>Page 3</button>
          <button onClick={() => setActivePage(4)}>Page 4</button>
          <ProgressBar
            addClass="my-2"
            value={activePage}
            max={4}
            label="page #"
          />
        </div>
        <div style={{ width: "720px" }}>
          <h2>Dropdowns</h2>
          <Dropdown
            ariaLabel="timezone-dropdown"
            label="dropdown"
            labelHidden={true}
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
                  onClick={(val) => setCurrentTimeZone(val)}
                >
                  {zone.text}
                </DropdownOption>
              );
            })}
          </Dropdown>
          <h2>Checkboxes</h2>
          <Checkbox label="Enabled selected" defaultChecked />
          <Checkbox label="Enabled unselected" />
          <Checkbox label="Disabled selected" defaultChecked disabled />
          <Checkbox label="Disabled unselected" disabled />
          <Checkbox
            label="Enabled selected"
            defaultChecked
            labelHidden={true}
            onChange={checkboxOnChange}
          />
          <h2>Textfields</h2>
          <TextField
            type="email"
            label="Login"
            placeholder="email here"
            onChange={textFieldOnChange}
            addClass="m-1"
          />
          <TextField
            type="password"
            label="Password"
            addClass="m-1"
            icon={PasswordButton}
            iconPosition="right"
          />
          <TextField type="date" label="What is today's date?" addClass="m-1" />
          <TextField type="number" label="How old are you?" addClass="m-1" />
          <TextField
            type="search"
            label="Search"
            addClass="m-1"
            icon={IconSearch}
          />
          <TextField type="tel" label="What is your number?" addClass="m-1" />
          <TextField
            type="time"
            label="What is the current time?"
            addClass="m-1"
            addInputClass="textfield-fit"
          />
          <TextField type="url" label="Personal website" addClass="m-1" />
        </div>
        <h2>Back Button</h2>
        <div className="row justify-left">
          <IconButton
            iconUrl={iconArrowLeft}
            onClick={() => navigate("/")}
          ></IconButton>
        </div>
      </div>
    </Fragment>
  );
}

function PasswordButton() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <button
      onClick={handleClick}
      style={{
        border: "none",
        backgroundColor: "#fff",
      }}
    >
      {isOpen ? <IconEyeOpen /> : <IconEyeClose />}
    </button>
  );
}

export { Demo };
