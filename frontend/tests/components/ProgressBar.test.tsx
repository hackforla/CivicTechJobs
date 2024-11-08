// External imports
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Internal imports
import { ProgressBar } from "components/components";

describe("ProgressBar", () => {
  test("ProgressBar component", () => {
    render(<ProgressBar label="test" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("ProgressBar accessibility", () => {
    render(<ProgressBar label="page number:" max={4} value={2} />);
    expect(screen.getByText("page number:")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemin",
      "1",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "4",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "2",
    );
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow",
      "1",
    );
  });
});
