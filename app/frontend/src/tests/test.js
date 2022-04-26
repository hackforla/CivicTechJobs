import React from "react";
import { getRoles, render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";

import { Button } from "components/components";
/*
getByText
getByRole
getByLabelText
getByPlaceholderText
getByAltText
getByDisplayValue
*/
/*
queryByText
queryByRole
queryByLabelText
queryByPlaceholderText
queryByAltText
queryByDisplayValue
*/
/*
findByText
findByRole
findByLabelText
findByPlaceholderText
findByAltText
findByDisplayValue
*/
/*
getAllBy
queryAllBy
findAllBy
*/
describe("Button", () => {
  test("Button component", () => {
    render(<Button>Log in</Button>);
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  test("Button tag accessibility", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("Button tag accessibility with link", () => {
    render(<Button href="www.google.com" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
