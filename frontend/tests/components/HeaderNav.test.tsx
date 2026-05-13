/**
 * Tests for `HeaderNav`'s auth-state-dependent auth control.
 *
 * `HeaderNav` is tested in isolation against a mocked `useAuth`; the
 * provider's bootstrap (csrf + me round-trips) is exercised in
 * `tests/contexts/AuthContext.test.tsx`.
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import HeaderNav from "@/shared/components/nav/HeaderNav";

const mockLogout = vi.fn();
let mockAuth: {
  user: object | null;
  loading: boolean;
  logout: typeof mockLogout;
};

vi.mock("@/shared/contexts/AuthContext", () => ({
  useAuth: () => mockAuth,
}));

describe("HeaderNav auth control", () => {
  beforeEach(() => {
    mockLogout.mockClear();
  });

  /** Signed out: a "Log In" button linking to /login; no "Log out". */
  test("anonymous shows a Log In link to /login", () => {
    mockAuth = { user: null, loading: false, logout: mockLogout };
    render(<HeaderNav />);
    expect(screen.getByText("Log In").closest("a")).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  /** During the initial me() round-trip the slot shows the signed-out state. */
  test("loading is treated as signed out", () => {
    mockAuth = { user: null, loading: true, logout: mockLogout };
    render(<HeaderNav />);
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  /** Signed in: a "Log out" button that calls logout(); no "Log In". */
  test("authenticated shows a Log out button that calls logout()", () => {
    mockAuth = { user: { id: "u1" }, loading: false, logout: mockLogout };
    render(<HeaderNav />);
    expect(screen.queryByText("Log In")).not.toBeInTheDocument();
    screen.getByRole("button", { name: "Log out" }).click();
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
