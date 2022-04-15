// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Dialog({ size = "sm", color = "primary", length = "", ...props }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(close);
  }

  return (
    <Fragment>
      <button id="open_dialog" onClick={handleOpen}>
        Open Dialog
      </button>

      <dialog
        open={open}
        aria-labelledby="dialog_title"
        aria-describedby="dialog_description"
      >
        <div>Hello World</div>
        <div class="flex flex-space-between">
          <button id="close_dialog" onClick={handleClose}>
            Close
          </button>
          <button id="confirm_dialog" class="cta">
            Confirm
          </button>
        </div>
      </dialog>
    </Fragment>
  );
}

// Type declaration for props
Dialog.propTypes = {
  addClass: PropTypes.string,
  color: PropTypes.oneOf(["primary", "primary-dark"]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  length: PropTypes.oneOf(["", "long"]),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg", "icon"]),
  target: PropTypes.oneOf([
    "_blank",
    "_self",
    "_parent",
    "_top",
    PropTypes.string,
  ]),
};

export { Dialog };
