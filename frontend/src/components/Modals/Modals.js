import PropTypes from "prop-types";
import React from "react";
import * as utility from "../Utility/utils";
import { CloseButton } from "../Buttons/CloseButton";
import "./_Modals.scss";

function Modal(props) {
  return (
    <div className={utility.combineClasses("modal", props.class)}>
      <CloseButton class="modal-x"></CloseButton>
      <div>{props.children}</div>
    </div>
  );
}

// Type declaration for props
Modal.propTypes = {
  class: PropTypes.string,
};

export { Modal };
