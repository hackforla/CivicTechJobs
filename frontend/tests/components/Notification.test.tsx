import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, test } from "vitest";

import { Notification } from "@/shared/components/Notification/Notification";

describe("Notification", () => {
  test("renders children with status role by default", () => {
    render(<Notification>This is a warning</Notification>);
    expect(screen.getByText("This is a warning")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("close button hides the notification", async () => {
    const user = userEvent.setup();
    render(
      <Notification show={true} closable>
        This is a warning
      </Notification>,
    );
    await user.click(screen.getByRole("button"));
    // After close, the bar gets aria-hidden and the .barHidden module
    // class. aria-hidden is the stable signal across the styling
    // migration; the hashed class name is not.
    expect(screen.getByRole("status", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
