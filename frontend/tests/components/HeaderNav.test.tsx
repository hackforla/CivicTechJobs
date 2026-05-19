/**
 * Tests for `HeaderNav`'s auth-state-dependent auth control and its
 * external-link list.
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

describe("HeaderNav structure", () => {
  beforeEach(() => {
    mockAuth = { user: null, loading: false, logout: mockLogout };
  });

  /** The logo renders and links home (SVG is aria-hidden; the link
   * carries the accessible name). */
  test("renders the logo linking home", () => {
    render(<HeaderNav />);
    expect(
      screen.getByRole("link", { name: "Civic Tech Jobs - Home" }),
    ).toHaveAttribute("href", "/");
  });
});

describe("HeaderNav external links", () => {
  beforeEach(() => {
    mockAuth = { user: null, loading: false, logout: mockLogout };
  });

  /** Only the "Hack for LA" org link remains after the 2026-05-14 trim. */
  test("renders the Hack for LA link", () => {
    render(<HeaderNav />);
    expect(screen.getByText("Hack for LA").closest("a")).toHaveAttribute(
      "href",
      "https://www.hackforla.org/",
    );
  });

  /** "How to Join" and "Projects" were dropped; guard against regression. */
  test("does not render the dropped How to Join / Projects links", () => {
    render(<HeaderNav />);
    expect(screen.queryByText("How to Join")).not.toBeInTheDocument();
    expect(screen.queryByText("Projects")).not.toBeInTheDocument();
  });
});
