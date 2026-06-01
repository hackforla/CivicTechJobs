/** Tests for `SignupForm` from `features/session/components/SignupForm.tsx`. */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import SignupForm from "@/features/session/components/SignupForm";
import { ApiError } from "@/shared/lib/api/client";

const pushMock = vi.fn();
const signupMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/shared/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn(),
    signup: signupMock,
    logout: vi.fn(),
    user: null,
    loading: false,
  }),
}));

describe("SignupForm", () => {
  beforeEach(() => {
    pushMock.mockReset();
    signupMock.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("combines firstName + lastName into name and calls signup()", async () => {
    signupMock.mockResolvedValue(undefined);
    render(<SignupForm />);

    fireEvent.input(screen.getByLabelText(/first name/i), {
      target: { value: "Ada" },
    });
    fireEvent.input(screen.getByLabelText(/last name/i), {
      target: { value: "Lovelace" },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "Sup3rSecret!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => expect(signupMock).toHaveBeenCalledOnce());
    expect(signupMock).toHaveBeenCalledWith({
      email: "ada@example.com",
      password: "Sup3rSecret!",
      name: "Ada Lovelace",
    });
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/"));
  });

  test("shows server error message on ApiError", async () => {
    signupMock.mockRejectedValue(
      new ApiError(
        400,
        "validation_error",
        "A user with that email already exists.",
      ),
    );
    render(<SignupForm />);

    fireEvent.input(screen.getByLabelText(/first name/i), {
      target: { value: "Ada" },
    });
    fireEvent.input(screen.getByLabelText(/last name/i), {
      target: { value: "Lovelace" },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "taken@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "Sup3rSecret!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/already exists/i),
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  test("disables submit button while submitting", async () => {
    let resolveSignup: () => void = () => {};
    signupMock.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveSignup = resolve;
      }),
    );
    render(<SignupForm />);

    fireEvent.input(screen.getByLabelText(/first name/i), {
      target: { value: "Ada" },
    });
    fireEvent.input(screen.getByLabelText(/last name/i), {
      target: { value: "Lovelace" },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "ada@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "Sup3rSecret!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /signing up/i }),
      ).toBeDisabled(),
    );
    resolveSignup();
  });
});
