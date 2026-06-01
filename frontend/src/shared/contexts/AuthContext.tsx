/**
 * Auth context: holds the current user and exposes login / signup /
 * logout actions.
 *
 * Mounted in the root layout so every route (logged-in and logged-out
 * paths alike) can read auth state through `useAuth()`. Logged-out
 * state is a real state, not a missing one - `user` is `null` and
 * `loading` is `false`. The `Login` button vs avatar in the nav, the
 * conditional redirect on protected pages, etc. all consume this
 * shape.
 *
 * Bootstrap on mount:
 *   1. `authApi.csrf()` seeds the `csrftoken` cookie.
 *   2. `authApi.me()` hydrates the user from any persisted session.
 *      A 403 means anonymous; that's the not-an-error baseline state.
 *      Any other error bubbles up.
 *
 * `useAuth()` throws if called outside `AuthProvider` - matches the
 * existing `useQualifiersContext` pattern in this repo and surfaces
 * missing-provider mistakes early.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  authApi,
  type LoginPayload,
  type SignupPayload,
  type User,
} from "@/shared/lib/api/auth";
import { ApiError } from "@/shared/lib/api/client";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Seed the CSRF cookie. Failures here aren't fatal - subsequent
      // mutations would fail their own CSRF check and surface the
      // problem with a clearer error than "csrf bootstrap failed".
      try {
        await authApi.csrf();
      } catch {
        // Silently swallowed; mutations will surface the real failure.
      }
      try {
        const me = await authApi.me();
        if (!cancelled) setUser(me);
      } catch (err) {
        // 403 == anonymous, the expected logged-out baseline. Any
        // other status is unexpected and should surface (network
        // error, 500, etc.) - re-throw so a top-level error boundary
        // can catch it.
        if (!(err instanceof ApiError) || err.status !== 403) {
          throw err;
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const next = await authApi.login(payload);
    setUser(next);
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    const next = await authApi.signup(payload);
    setUser(next);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
