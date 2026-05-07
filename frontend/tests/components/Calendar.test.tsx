import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";

import { Calendar } from "@/shared/components/Inputs/Calendar";

describe("Calendar", () => {
  test("renders the calendar root", () => {
    render(<Calendar onChange={() => {}} />);
    expect(screen.getByTestId("calendar-root")).toBeInTheDocument();
  });

  test("drag selects and unselects availability cells", async () => {
    render(<Calendar onChange={() => {}} />);
    const checkboxes = screen.getAllByRole("checkbox");
    const checkbox1 = checkboxes[0];
    const checkbox2 = checkboxes[1];

    fireEvent.mouseDown(checkbox1);
    fireEvent.mouseMove(checkbox1);
    fireEvent.mouseMove(checkbox2);
    await waitFor(() => {
      expect(checkbox1).toHaveAttribute("aria-checked", "true");
      expect(checkbox2).toHaveAttribute("aria-checked", "true");
    });

    fireEvent.mouseDown(checkbox2);
    fireEvent.mouseMove(checkbox2);
    fireEvent.mouseMove(checkbox1);
    await waitFor(() => {
      expect(checkbox1).toHaveAttribute("aria-checked", "false");
      expect(checkbox2).toHaveAttribute("aria-checked", "false");
    });
  });

  test("applies aria-label per cell", () => {
    render(<Calendar onChange={() => {}} />);
    const cells = screen.getAllByRole("checkbox");
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 7) + 1;
      const col = (index % 7) + 1;
      expect(cell).toHaveAttribute(
        "aria-label",
        `I am available on ${row}, ${col}`,
      );
    });
  });
});
