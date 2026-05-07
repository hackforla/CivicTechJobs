/** Component tests for `Button` from `shared/components/Buttons.tsx`. */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";

import { Button } from "@/shared/components/Buttons";

describe("Button", () => {
  /** Children text passes through to the rendered element. */
  test("renders children text", () => {
    render(<Button>Log in</Button>);
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  /** Without href, renders a native `<button>` (no link role). */
  test("renders as button when href is omitted", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  /** With href, renders an `<a>` (no button role). */
  test("renders as link when href is provided", () => {
    render(<Button href="www.google.com" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
