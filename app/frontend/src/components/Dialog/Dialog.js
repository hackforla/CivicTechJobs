// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

// Internal Imports
import { combineClasses, onEnterKey } from "../Utility/utils";

function Dialog({ open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open);

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
    }
  }, [isOpen]);

  // The next two useEffect and handleClose function ensures that rather than closing immediately, an animation is run when dialog is set to be closed
  useEffect(() => {
    if (open) setIsOpen(open);
  }, [open]);

  function handleClose(e) {
    if (e.target === windowRef.current) {
      props.onClose();
    }
  }

  return (
    <Fragment>
      <div
        className={combineClasses(
          "dialog",
          !isOpen && "hidden",
          props.addClass
        )}
        ref={windowRef}
        onClick={(e) => handleClose(e)}
        onEnterKey={(e) => onEnterKey(handleClose)(e)}
        role="dialog"
        aria-label={props.ariaLabel}
        tabIndex="-1"
      >
        <CSSTransition
          in={open}
          classNames="dialog"
          timeout={400}
          unmountOnExit
          onExited={() => setIsOpen(false)}
        >
          {props.children}
        </CSSTransition>
      </div>
    </Fragment>
  );
}

// Type declaration for props
Dialog.propTypes = {
  addClass: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export { Dialog };
