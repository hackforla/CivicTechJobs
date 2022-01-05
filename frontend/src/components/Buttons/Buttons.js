import PropTypes from 'prop-types';
import React from "react";
import "./_Buttons.scss";

function Button({ size = "sm", color = "primary", ...props }) {
  console.log(props)


  return (
    <button className={`btn-${size} btn-${color} ${props.class || ""}`} disabled={true}>
      {props.children}
    </button>
  );
}

function ButtonLink({ size = "sm", color = "primary", ...props }) {
  return (
    <a className={`btn-${size} btn-${color} ${props.class || ""}`}>
      {props.children}
    </a>
  );
}

export { Button, ButtonLink };
