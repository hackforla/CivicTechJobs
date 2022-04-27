// External imports
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime"; // needed to run async tests
import { config } from "react-transition-group";

// Internal imports
import { LandingPage } from "pages/LandingPage/LandingPage";

// Disables animation transition time so it will not hamper testing
config.disabled = true;

describe("Landing Page", () => {
  test("Landing Page links", () => {
    render(<LandingPage />);

    expect(screen.getByText("Hack for LA")).toHaveAttribute("href");
    expect(screen.getByText("How to Join")).toHaveAttribute("href");
    expect(screen.getByText("Projects")).toHaveAttribute("href");
    expect(screen.getByText("Credits")).toHaveAttribute("href");
    expect(screen.getByText("Sitemap")).toHaveAttribute("href");
    expect(
      screen.getByText("Join Us", { selector: ".footer-links" })
    ).toHaveAttribute("href");
  });

  test("Landing Page dialog", async () => {
    const user = userEvent.setup();
    render(<LandingPage />);

    expect(screen.getByRole("dialog")).toHaveClass("hidden");

    await user.click(
      screen.getByText(/Engineering/, {
        selector: ".landing-cop-circle-title",
      })
    );
    expect(await screen.findByRole("dialog")).not.toHaveClass("hidden");

    await user.click(screen.getByLabelText("close"));
    expect(await screen.findByRole("dialog")).toHaveClass("hidden");
  });
});
