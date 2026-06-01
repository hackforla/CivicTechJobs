/** Tests for `LoginForm` from `features/session/components/LoginForm.tsx`. */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import LoginForm from "@/features/session/components/LoginForm";
import { ApiError } from "@/shared/lib/api/client";

const pushMock = vi.fn();
const loginMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/shared/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: loginMock,
    signup: vi.fn(),
    logout: vi.fn(),
    user: null,
    loading: false,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    pushMock.mockReset();
    loginMock.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("calls login() and redirects on success", async () => {
    loginMock.mockResolvedValue(undefined);
    render(<LoginForm />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "Sup3rSecret!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(loginMock).toHaveBeenCalledOnce());
    expect(loginMock).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "Sup3rSecret!",
    });
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/"));
  });

  test("shows server error message and does not redirect on ApiError", async () => {
    loginMock.mockRejectedValue(
      new ApiError(400, "validation_error", "Invalid email or password."),
    );
    render(<LoginForm />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "Sup3rSecret!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        /invalid email or password/i,
      ),
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  test("disables submit button while submitting", async () => {
    let resolveLogin: () => void = () => {};
    loginMock.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveLogin = resolve;
      }),
    );
    render(<LoginForm />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "Sup3rSecret!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /logging in/i }),
      ).toBeDisabled(),
    );
    resolveLogin();
  });

  test("does not call login() when client-side validation fails", () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    // RHF blocks submission; loginMock is never called.
    expect(loginMock).not.toHaveBeenCalled();
  });
});
