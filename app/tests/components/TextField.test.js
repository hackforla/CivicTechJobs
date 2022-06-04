// External imports
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime";
import { config } from "react-transition-group";

// Internal imports
import { TextField } from "components/components";

config.disabled = true;

describe("TextField", () => {
  test("TextField component", async () => {
    const user = userEvent.setup();
    render(<TextField label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();

    await user.click(screen.getByRole("textbox"));
    await user.keyboard("foo");
    expect(await screen.getByDisplayValue("foo")).toBeInTheDocument();

    await user.keyboard("{tab}{tab}");
    expect(await screen.getByRole("textbox")).toHaveFocus();

    await user.keyboard("bar");
    expect(await screen.getByDisplayValue("bar")).toBeInTheDocument();
  });
});
