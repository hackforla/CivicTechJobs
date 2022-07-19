// External Imports
import React, { useState } from "react";
import { Checkbox, Dropdown } from "components/components";
import { TextField } from "components/components";
import { IconEyeClose, IconEyeOpen, IconSearch } from "assets/images/images";
import { DropdownItem } from "components/Inputs/Dropdown";

function Demo() {
  function textFieldOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function checkboxOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked);
  }

  return (
    <div className="flex-column m-5">
      <h1>
        Hello World! Feel free to use this page as a playground to test code!
      </h1>
      <div style={{ width: "440px" }}>
        <Dropdown label="dropdown" labelHidden={true}>
          <DropdownItem value="Barbarian">Barbarian</DropdownItem>
          <DropdownItem value="Bard">Bard</DropdownItem>
          <DropdownItem value="Monk">Monk</DropdownItem>
          <DropdownItem value="Rogue">Rogue</DropdownItem>
          <DropdownItem value="Shaman">Shaman</DropdownItem>
        </Dropdown>
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
