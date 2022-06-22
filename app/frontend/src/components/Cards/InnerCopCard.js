import { combineClasses } from "../Utility/utils";
import PropTypes from "prop-types";
import React from "react";

function InnerCopCard(props) {
  return (
    <div className={combineClasses("card", "inner-cop-card", props.addClass)}>
      <div className="inner-cop-card-content">{props.children}</div>
    </div>
  );
}

InnerCopCard.propTypes = {
  addClass: PropTypes.string,
};

export { InnerCopCard };
