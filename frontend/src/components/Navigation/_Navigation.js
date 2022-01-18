// External Imports
import PropTypes from "prop-types";
import React, { useState } from "react";

// Internal Imports
import {
  CopIconData,
  CopIconEngineering,
  CopIconOps,
  CopIconProduct,
  CopIconUiux,
} from "../../assets/images/images";
import { InnerCopNavCard } from "../Cards/Cards";
import * as utility from "../Utility/utils";
import "./_Navigation.scss";

function InnerCopNav(props) {
  const communities = [
    { name: "UI/UX", icon: CopIconUiux },
    { name: "Engineering", icon: CopIconEngineering },
    { name: "Data Science", icon: CopIconData },
    { name: "Project/Product Management", icon: CopIconProduct },
    { name: "Ops", icon: CopIconOps },
  ];

  return (
    <nav className="inner-cop-nav">
      {communities.map((cop, index) => (
        <InnerCopNavCard key={index}>
          <img src={cop.icon} height="24"></img>
          <span className="title-6">{cop.name}</span>
        </InnerCopNavCard>
      ))}
    </nav>
  );
}

InnerCopNav.propTypes = {};

export { InnerCopNav };