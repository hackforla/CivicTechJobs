// External imports
import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { config } from "react-transition-group";

// Internal imports
import { Notification } from "components/components";

config.disabled = true;

describe("Notification", () => {
  test("Notification component", () => {
    render(<Notification>This is a warning</Notification>);
    expect(screen.getByText("This is a warning")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("Notification component closable", async () => {
    const user = userEvent.setup();
    render(
      <Notification show={true} closable>
        This is a warning
      </Notification>
    );
    await user.click(screen.queryByRole("button")!);
  });

  test("Notification component autoHidden", async () => {
    const user = userEvent.setup();
    render(
      <Notification show={true} autoHidden>
        This is a warning
      </Notification>
    );
    await waitForElementToBeRemoved(screen.getByRole("status"), {
      timeout: 10,
    }).catch((err) => {
      expect(screen.getByText("This is a warning")).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
    await waitForElementToBeRemoved(screen.getByRole("status"), {
      timeout: 1000,
    });
  });
});
