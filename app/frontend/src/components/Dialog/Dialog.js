// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Dialog({ open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  const windowRef = useRef(null);

  useEffect(() => {
    const scrollWidth = Math.abs(
      window.innerWidth - document.documentElement.clientWidth
    );
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    isOpen
      ? (document.body.style.paddingRight = `${scrollWidth}px`)
      : document.body.style.removeProperty("padding-right");
    if (!isOpen) props.onClose();
  }, [isOpen]);

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
