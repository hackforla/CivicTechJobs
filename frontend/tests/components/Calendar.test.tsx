// External imports
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime";
import { config } from "react-transition-group";

// Internal imports
import { Calendar } from "components/components";

config.disabled = true;

describe("Calendar", () => {
  test("Calendar Component", async () => {
    render(<Calendar onChange={(e) => {}} />);
    expect(screen.getByTestId("calendar-root")).toBeInTheDocument();
  });

  test("Able to Drag to Select and Unselect Availability", async () => {
    const { container } = render(<Calendar onChange={(e) => {}} />);
    const calendarCells = container.querySelectorAll(".calendar-cell");
    const checkbox1 = calendarCells[0].querySelector('[role="checkbox"]');
    const checkbox2 = calendarCells[1].querySelector('[role="checkbox"]');
    if (checkbox1 && checkbox2) {
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
    }
  });

  test("Calendar Accessibility Labels are Applied", () => {
    render(<Calendar onChange={(e) => {}} />);
    const cells = screen.getAllByRole("checkbox");
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 7) + 1;
      const col = (index % 7) + 1;
      expect(cell).toHaveAttribute("aria-label", `I am available on ${row}, ${col}`);
    });
  });
});
