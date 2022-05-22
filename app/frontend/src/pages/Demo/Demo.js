// External Imports
import React from "react";
import { Checkbox } from "components/components";
import { TextField } from "components/components";
import { IconEyeOpen, IconSearch } from "assets/images/images";

function Demo() {
  return (
    <div className="flex-column m-5">
      <h1>
        Hello World! Feel free to use this page as a playground to test code!
      </h1>
      <div style={{ width: "440px" }}>
        <Checkbox label={"Enabled selected"} defaultChecked />
        <Checkbox label={"Enabled unselected"} />
        <Checkbox label={"Disabled selected"} defaultChecked disabled />
        <Checkbox label={"Disabled unselected"} disabled />
        <Checkbox
          label={"Enabled selected"}
          defaultChecked
          labelHidden={true}
        />
        <TextField label="Login" addClass="m-1" />
        <TextField label="Search" addClass="m-1" icon={IconSearch} />
        <TextField
          label="Password"
          addClass="m-1"
          icon={IconEyeOpen}
          iconPosition="right"
        />
      </div>
    </div>
  );
}

export { Demo };
