import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { Calendar } from "@/shared/components/Inputs/Calendar";

describe("Calendar", () => {
  test("renders the calendar root", () => {
    render(<Calendar onChange={() => {}} />);
    expect(screen.getByTestId("calendar-root")).toBeInTheDocument();
  });

  test("drag selects and unselects availability cells", async () => {
    const { container } = render(<Calendar onChange={() => {}} />);
    const calendarCells = container.querySelectorAll(".calendar-cell");
    const checkbox1 = calendarCells[0].querySelector('[role="checkbox"]');
    const checkbox2 = calendarCells[1].querySelector('[role="checkbox"]');
    if (!checkbox1 || !checkbox2) return;

    fireEvent.mouseDown(checkbox1);
    fireEvent.mouseMove(checkbox1);
    fireEvent.mouseMove(checkbox2);
    await waitFor(() => {
      expect(calendarCells[0]).toHaveClass("selected");
      expect(calendarCells[1]).toHaveClass("selected");
    });

    fireEvent.mouseDown(checkbox2);
    fireEvent.mouseMove(checkbox2);
    fireEvent.mouseMove(checkbox1);
    await waitFor(() => {
      expect(calendarCells[0]).not.toHaveClass("selected");
      expect(calendarCells[1]).not.toHaveClass("selected");
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
