// External imports
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime";
import { config } from "react-transition-group";

// Internal imports
import { Checkbox } from "components/components";

config.disabled = true;

describe("Checkbox", () => {
  test("Checkbox component", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Full Stack Developer" />);
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.queryByText("Front end Developer")).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/Full Stack Developer/));
    expect(await screen.queryByRole("checkbox")).toBeChecked();
    await user.click(screen.getByLabelText(/Full Stack Developer/));
    expect(await screen.queryByRole("checkbox")).not.toBeChecked();

    await user.keyboard("{tab}{tab}");
    expect(await screen.queryByRole("checkbox")).toHaveFocus();
    await user.keyboard("{ }");
    expect(await screen.queryByRole("checkbox")).toBeChecked();
  });

  test("Checkbox disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="disabled checkbox" disabled />);

    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(screen.queryByRole("checkbox")).not.toBeChecked();

    await user.click(screen.getByLabelText(/disabled checkbox/));
    expect(screen.queryByRole("checkbox")).not.toBeChecked();

    await user.keyboard("{tab}{tab}");
    expect(screen.queryByRole("checkbox")).not.toHaveFocus();
    await user.keyboard("{ }");
    expect(screen.queryByRole("checkbox")).not.toBeChecked();
  });

  test("Checkbox defaultChecked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="defaultChecked checkbox" defaultChecked />);

    expect(screen.queryByRole("checkbox")).not.toBeDisabled();
    expect(screen.getByRole("checkbox")).toBeChecked();

    await user.click(screen.getByLabelText(/defaultChecked checkbox/));
    expect(screen.queryByRole("checkbox")).not.toBeChecked();

    await user.keyboard("{tab}{tab}");
    expect(screen.queryByRole("checkbox")).toHaveFocus();
    await user.keyboard("{ }");
    expect(screen.queryByRole("checkbox")).toBeChecked();
  });

  test("Checkbox labelHidden", () => {
    render(<Checkbox label="labelHidden checkbox" labelHidden />);
    expect(screen.getByLabelText(/labelHidden checkbox/)).toHaveClass(
      "sr-only",
    );
  });
});
