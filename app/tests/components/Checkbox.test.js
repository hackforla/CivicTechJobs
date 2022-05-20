// External imports
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Internal imports
import { Checkbox } from "components/components";

describe("Checkbox", () => {
  test("Checkbox component", () => {
    render(<Checkbox label="Full Stack Developer" />);
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.queryByText("Front end Developer")).not.toBeInTheDocument();
  });

  test("Checkbox accessibility", () => {
    render(<Checkbox label="" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
