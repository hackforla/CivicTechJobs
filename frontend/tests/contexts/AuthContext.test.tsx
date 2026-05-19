/** Tests for `AuthProvider` / `useAuth`. */

import { act, render, renderHook, waitFor } from "@testing-library/react";
import React from "react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
  type MockInstance,
} from "vitest";

import { AuthProvider, useAuth } from "@/shared/contexts/AuthContext";
import { authApi, type User } from "@/shared/lib/api/auth";
import { ApiError } from "@/shared/lib/api/client";

const baseUser: User = {
  id: "00000000-0000-0000-0000-000000000001",
  people_depot_user_id: "local:test",
  name: "Test User",
  email: "test@example.com",
  community_of_practice: null,
  skills_learned_matrix: null,
  max_available_hours: null,
  meeting_availability: null,
  isProjectManager: false,
  created_at: "2026-05-08T00:00:00Z",
  updated_at: "2026-05-08T00:00:00Z",
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthProvider", () => {
  let csrfSpy: ReturnType<typeof vi.spyOn>;
  let meSpy: ReturnType<typeof vi.spyOn>;
  // Type the spy directly via vitest's `MockInstance<F>`. Bare
  // `ReturnType<typeof vi.spyOn>` defaults to
  // `MockInstance<(this: unknown, ...args: unknown[]) => unknown>`,
  // which the parameterized spy returned by the actual call can't
  // assign into (function parameters are contravariant). vitest 3
  // narrowed that default; vitest 2 was looser. Only login/signup
  // need it - csrf/me/logout take no args, so the contravariance
  // problem doesn't arise.
  let loginSpy: MockInstance<typeof authApi.login>;
  let signupSpy: MockInstance<typeof authApi.signup>;
  let logoutSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    csrfSpy = vi.spyOn(authApi, "csrf").mockResolvedValue(undefined);
    meSpy = vi.spyOn(authApi, "me");
    loginSpy = vi.spyOn(authApi, "login");
    signupSpy = vi.spyOn(authApi, "signup");
    logoutSpy = vi.spyOn(authApi, "logout").mockResolvedValue(undefined);
  });

  afterEach(() => {
    csrfSpy.mockRestore();
    meSpy.mockRestore();
    loginSpy.mockRestore();
    signupSpy.mockRestore();
    logoutSpy.mockRestore();
  });

  test("seeds user from /me on mount when authenticated", async () => {
    meSpy.mockResolvedValue(baseUser);
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.user).toEqual(baseUser);
    expect(csrfSpy).toHaveBeenCalledOnce();
  });

  test("user remains null on mount when /me returns 403", async () => {
    meSpy.mockRejectedValue(new ApiError(403, "not_authenticated", "anon"));
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.user).toBeNull();
  });

  test("login() updates user state", async () => {
    meSpy.mockRejectedValue(new ApiError(403, "not_authenticated", "anon"));
    loginSpy.mockResolvedValue(baseUser);
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    await act(async () => {
      await result.current.login({
        email: "test@example.com",
        password: "Sup3rSecret!",
      });
    });
    expect(result.current.user).toEqual(baseUser);
    expect(loginSpy).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "Sup3rSecret!",
    });
  });

  test("signup() updates user state", async () => {
    meSpy.mockRejectedValue(new ApiError(403, "not_authenticated", "anon"));
    signupSpy.mockResolvedValue(baseUser);
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    await act(async () => {
      await result.current.signup({
        email: "test@example.com",
        password: "Sup3rSecret!",
        name: "Test User",
      });
    });
    expect(result.current.user).toEqual(baseUser);
  });

  test("logout() clears user state", async () => {
    meSpy.mockResolvedValue(baseUser);
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.user).toEqual(baseUser));
    await act(async () => {
      await result.current.logout();
    });
    expect(result.current.user).toBeNull();
    expect(logoutSpy).toHaveBeenCalledOnce();
  });

  test("useAuth throws when used outside AuthProvider", () => {
    // Suppress the expected error log from React's error boundary path.
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow(
      /useAuth must be used within an AuthProvider/,
    );
    consoleSpy.mockRestore();
  });

  test("login error is propagated to caller", async () => {
    meSpy.mockRejectedValue(new ApiError(403, "not_authenticated", "anon"));
    loginSpy.mockRejectedValue(
      new ApiError(400, "validation_error", "Invalid credentials."),
    );
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    await expect(
      result.current.login({ email: "x@x.com", password: "wrong" }),
    ).rejects.toBeInstanceOf(ApiError);
    expect(result.current.user).toBeNull();
  });
});

describe("AuthProvider integration with React tree", () => {
  test("renders children", async () => {
    vi.spyOn(authApi, "csrf").mockResolvedValue(undefined);
    vi.spyOn(authApi, "me").mockRejectedValue(
      new ApiError(403, "not_authenticated", "anon"),
    );
    const { getByText } = render(
      <AuthProvider>
        <div>hello</div>
      </AuthProvider>,
    );
    expect(getByText("hello")).toBeInTheDocument();
  });
});
