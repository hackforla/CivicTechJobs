// External imports
import React from "react";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument, toHaveClass } from "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime";
import { config } from "react-transition-group";

// Internal imports
import { Button } from "components/components";
import { LandingPage } from "pages/LandingPage/LandingPage";

// Disables animation transition time so it will not hamper testing
config.disabled = true;

describe("Button", () => {
  test("Button component", () => {
    render(<Button>Log in</Button>);
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  test("Button tag accessibility", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("Button tag accessibility with link", () => {
    render(<Button href="www.google.com" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

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
      screen.getByText(/Engineering/, { selector: ".landing-cop-circle-title" })
    );
    expect(await screen.findByRole("dialog")).not.toHaveClass("hidden");

    await user.click(screen.getByLabelText("close"));

    expect(await screen.findByRole("dialog")).toHaveClass("hidden");
  });
});
