// External Imports
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

// Internal Imports
import { combineClasses } from "../Utility/utils";

function Dialog({ open = false, ...props }) {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  const windowRef = useRef(null);

  // Adjust padding on body when scrollbar is hidden so that page content does not jump
  useEffect(() => {
    if (isBackdropOpen) {
      const scrollWidth = Math.abs(
        window.innerWidth - document.documentElement.clientWidth
      );
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("padding-right");
      document.body.style.overflow = "auto";
    }
  }, [isBackdropOpen]);

  function handleClose(e) {
    if (e.target === windowRef.current || ["Escape", "Esc"].includes(e.key)) {
      props.onClose();
    }
  }

  return (
    <div
      className={combineClasses(
        "dialog-backdrop",
        !isBackdropOpen && "hidden",
        props.addClass
      )}
      ref={windowRef}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={combineClasses(props.addClass)}
        role="dialog"
        aria-label={props.ariaLabel}
        tabIndex="-1"
      >
        <CSSTransition
          in={open}
          classNames="dialog"
          timeout={400}
          unmountOnExit
          onEnter={() => setIsBackdropOpen(true)}
          onExited={() => {
            setIsBackdropOpen(false);
          }}
        >
          {props.children}
        </CSSTransition>
      </div>
    </div>
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
