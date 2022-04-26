import React from "react";
import { render, screen } from "@testing-library/react";

import { Button } from "components/components";

describe("Button", () => {
  test("renders Button component", () => {
    render(<Button />);

    screen.debug();
  });
});
