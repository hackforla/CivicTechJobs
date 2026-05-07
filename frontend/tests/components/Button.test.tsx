import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";

import { Button } from "@/shared/components/Buttons";

describe("Button", () => {
  test("renders children text", () => {
    render(<Button>Log in</Button>);
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  test("renders as button when href is omitted", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("renders as link when href is provided", () => {
    render(<Button href="www.google.com" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
