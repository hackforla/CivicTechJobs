import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "@/shared/components/Checkbox";

describe("Checkbox", () => {
  test("toggles via mouse and keyboard", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Full Stack Developer" />);
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.queryByText("Front end Developer")).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/Full Stack Developer/));
    expect(screen.queryByRole("checkbox")).toBeChecked();
    await user.click(screen.getByLabelText(/Full Stack Developer/));
    expect(screen.queryByRole("checkbox")).not.toBeChecked();

    await user.keyboard("{tab}{tab}");
    expect(screen.queryByRole("checkbox")).toHaveFocus();
    await user.keyboard("{ }");
    expect(screen.queryByRole("checkbox")).toBeChecked();
  });

  test("disabled cannot be toggled", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="disabled checkbox" disabled />);

    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(screen.queryByRole("checkbox")).not.toBeChecked();

    await user.click(screen.getByLabelText(/disabled checkbox/));
    expect(screen.queryByRole("checkbox")).not.toBeChecked();
  });

  test("defaultChecked starts checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="defaultChecked checkbox" defaultChecked />);

    expect(screen.queryByRole("checkbox")).not.toBeDisabled();
    expect(screen.getByRole("checkbox")).toBeChecked();

    await user.click(screen.getByLabelText(/defaultChecked checkbox/));
    expect(screen.queryByRole("checkbox")).not.toBeChecked();
  });

  test.skip("labelHidden visually hides the label text", () => {
    // The hiding is purely CSS (clip/position/overflow on a hashed
    // .module.css class). jsdom doesn't apply stylesheet declarations
    // to getComputedStyle output, so there's nothing meaningful to
    // assert from the test runtime. Verified by hand in the browser.
  });
});
