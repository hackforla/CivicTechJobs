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
    render(<TextField label="Full Stack Developer" />);
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.queryByText("Front end Developer")).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/Full Stack Developer/));
    expect(await screen.queryByRole("checkbox")).toBeChecked();

    await user.click(screen.getByLabelText(/Full Stack Developer/));
    expect(await screen.queryByRole("checkbox")).not.toBeChecked();
  });
});
