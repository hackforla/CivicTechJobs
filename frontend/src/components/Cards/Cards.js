import PropTypes from "prop-types";
import React from "react";
import * as utility from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";
import "./_Cards.scss";

function LargeCopCard(props) {
  return (
    <div className={utility.combineClasses("card", "cop-card-lg", props.class)}>
      <CloseButton class="cop-card-lg-x"></CloseButton>
      <div class="cop-card-lg-content">{props.children}</div>
    </div>
  );
}

function SmallCopCard(props) {
  return (
    <div className={utility.combineClasses("card", "cop-card-sm", props.class)}>
      <CloseButton class="cop-card-sm-x"></CloseButton>
      <div class="cop-card-sm-content">{props.children}</div>
    </div>
  );
}

// Type declaration for props
LargeCopCard.propTypes = {
  class: PropTypes.string,
};

SmallCopCard.propTypes = {
  class: PropTypes.string,
};

export { LargeCopCard, SmallCopCard };
