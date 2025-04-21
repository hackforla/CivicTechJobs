// External imports
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Internal imports
import { Button } from "components/components";

describe("Button", () => {
  it("Button component", () => {
    render(<Button>Log in</Button>);
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  it("Button tag accessibility", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("Button tag accessibility with link", () => {
    render(<Button href="www.google.com" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
