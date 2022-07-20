// External Imports
import React, { Fragment, useState } from "react";
import {
  Checkbox,
  TextField,
  ProgressBar,
  Button,
} from "components/components";
import { IconEyeClose, IconEyeOpen, IconSearch } from "assets/images/images";

function Demo() {
  const [activePage, setActivePage] = useState(1);

  function textFieldOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function checkboxOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked);
  }

  return (
    <Fragment>
      <div className="m-5">
        <div>
          <ProgressBar addClass="my-2" value={1} label="page #" />
          <ProgressBar addClass="my-2" label="page #" />
          <ProgressBar addClass="my-2" value={2} max={3} label="page #" />
        </div>
        <hr></hr>
        <div className="my-2">
          Test out the progress bar
          <br></br>
          <br></br>
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
      </div>
      <div className="flex-column m-5">
        <h1>
          Hello World! Feel free to use this page as a playground to test code!
        </h1>
        <div style={{ width: "440px" }}>
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
