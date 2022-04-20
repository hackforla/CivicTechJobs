// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Dialog({ open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open);

  const windowRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    if (!isOpen) {
      props.onClose();
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function handleClose(e) {
    if (e.target === windowRef.current) {
      setIsOpen(false);
    }
  }

  return (
    <Fragment>
      <div
        className={combineClasses(
          "dialog",
          "modal",
          !isOpen && "hidden",
          props.addClass
        )}
        ref={windowRef}
        onClick={(e) => handleClose(e)}
      >
        {props.children}
      </div>
    </Fragment>
  );
}

// Type declaration for props
Dialog.propTypes = {
  addClass: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export { Dialog };
