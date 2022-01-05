import React from "react";
import "./_Buttons.scss";

function Button(props) {
  return <button className={`${props.class}`}>{props.children}</button>;
}

function ButtonLink(props) {
  return <a className={`${props.class}`}>{props.children}</a>;
}

export { Button, ButtonLink };
