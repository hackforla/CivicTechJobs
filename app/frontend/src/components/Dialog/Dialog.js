// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Dialog({ open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  const windowRef = useRef(null);

  // Adjust padding on body when scrollbar is hidden so that page content does not jump
  // Also runs props.onClose() callback
  useEffect(() => {
    if (isOpen) {
      const scrollWidth = Math.abs(
        window.innerWidth - document.documentElement.clientWidth
      );
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("padding-right");
      document.body.style.overflow = "auto";
      props.onClose();
    }
  }, [isOpen]);

  // The next two useEffect and handleClose function ensures that rather than closing immediately, an animation is run when dialog is set to be closed
  useEffect(() => {
    open ? setIsOpen(open) : setIsClosing(true);
  }, [open]);

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 400);
    }
  }, [isClosing]);

  function handleClose(e) {
    if (e.target === windowRef.current) {
      setIsClosing(true);
    }
  }

  return (
    <Fragment>
      <div
        className={combineClasses(
          "dialog",
          !isOpen && "hidden",
          isClosing && "dialog-close",
          props.addClass
        )}
        ref={windowRef}
        onClick={(e) => handleClose(e)}
        role="dialog"
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
