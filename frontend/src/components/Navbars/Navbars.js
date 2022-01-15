// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import * as utility from "../Utility/utils";
import { InnerCopNavCard } from "../Cards/Cards";
import "./_Navbars.scss";

function InnerCopNav(props) {
  return (
    <nav>
      <InnerCopNavCard></InnerCopNavCard>
    </nav>
  );
}
