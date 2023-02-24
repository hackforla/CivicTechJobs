// External imports
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime";
import { config } from "react-transition-group";

// Internal imports
import { Calendar } from "components/components";

config.disabled = true;

describe("Calendar", () => {
  test("Calendar component", async () => {
    const user = userEvent.setup();
  });
});
