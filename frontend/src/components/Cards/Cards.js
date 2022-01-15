import PropTypes from "prop-types";
import React, { useState } from "react";
import * as utility from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";
import "./_Cards.scss";

function LargeCopCard({openState = false, ...props}) {
  const [isOpen, setIsOpen] = useState(openState);

  return (
    <div
      className={utility.combineClasses(
        "card",
        "cop-card-lg",
        props.class,
        isOpen ? undefined : "disabled"
      )}
    >
      <CloseButton
        class="cop-card-lg-x"
        onClick={() => setIsOpen(false)}
      ></CloseButton>
      <div className="cop-card-lg-content">{props.children}</div>
    </div>
  );
}

function SmallCopCard({openState = false, ...props}) {
  const [isOpen, setIsOpen] = useState(openState);

  return (
    <div
      className={utility.combineClasses(
        "card",
        "cop-card-sm",
        props.class,
        isOpen ? undefined : "disabled"
      )}
    >
      <CloseButton
        class="cop-card-sm-x"
        onClick={() => setIsOpen(false)}
      ></CloseButton>
      <div className="cop-card-sm-content">{props.children}</div>
    </div>
  );
}

// Type declaration for props
LargeCopCard.propTypes = {
  class: PropTypes.string,
  openState: PropTypes.bool,
};

SmallCopCard.propTypes = {
  class: PropTypes.string,
  openState: PropTypes.bool,
};

export { LargeCopCard, SmallCopCard };
