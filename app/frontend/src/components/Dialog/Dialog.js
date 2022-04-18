// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Dialog({ open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "scroll";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Fragment>
      <div
        id="myModal"
        className={combineClasses(
          "dialog",
          "modal",
          "flex-container",
          "justify-center",
          "align-center",
          !isOpen && "hidden",
          props.addClass
        )}
      >
        <div className="modal-content">{props.children}</div>
      </div>
    </Fragment>
  );
}

// Type declaration for props
Dialog.propTypes = {
  addClass: PropTypes.string,
  open: PropTypes.bool,
};

export { Dialog };
