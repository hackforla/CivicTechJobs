// External Imports
import React from "react";
import { LogoVertical } from "assets/images/images";
import { Checkbox } from "components/components";

function Demo() {
  return (
    <div className="flex-column m-5">
      <h1>
        Hello World! Feel free to use this page as a playground to test code!
      </h1>
      <Checkbox label={"Enabled selected"} defaultChecked />
      <Checkbox label={"Enabled unselected"} />
      <Checkbox label={"Disabled selected"} defaultChecked disabled />
      <Checkbox label={"Disabled unselected"} disabled />
      <Checkbox label={"Enabled selected"} defaultChecked labelHidden={true} />
    </div>
  );
}

export { Demo };
