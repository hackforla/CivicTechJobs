import React from "react";
import "./_buttons.scss";

function Button(props) {
  return <button className={`btn ${props.class}`}>{props.children}</button>;
}

function ButtonLink(props) {
  return <a className={`btn ${props.class}`}>{props.children}</a>;
}

export { Button, ButtonLink };
