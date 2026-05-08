/** Tests for the shared `apiFetch` client. */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { ApiError, apiFetch } from "@/shared/lib/api/client";

describe("apiFetch", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, "fetch");
    // Default cookie state: empty. Individual tests override via
    // Object.defineProperty on document.
    Object.defineProperty(document, "cookie", {
      configurable: true,
      writable: true,
      value: "",
    });
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  test("returns parsed JSON on 200", async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const result = await apiFetch<{ ok: boolean }>("/api/test/");
    expect(result).toEqual({ ok: true });
  });

  test("returns undefined on 204", async () => {
    fetchSpy.mockResolvedValueOnce(new Response(null, { status: 204 }));
    const result = await apiFetch<void>("/api/test/", { method: "POST" });
    expect(result).toBeUndefined();
  });

  test("sends credentials: include", async () => {
    fetchSpy.mockResolvedValueOnce(new Response("{}", { status: 200 }));
    await apiFetch("/api/test/");
    const init = fetchSpy.mock.calls[0]![1] as RequestInit;
    expect(init.credentials).toBe("include");
  });

  test("sends X-CSRFToken header on POST when csrftoken cookie is present", async () => {
    Object.defineProperty(document, "cookie", {
      configurable: true,
      writable: true,
      value: "csrftoken=abc123",
    });
    fetchSpy.mockResolvedValueOnce(new Response("{}", { status: 200 }));
    await apiFetch("/api/test/", { method: "POST", body: { x: 1 } });
    const init = fetchSpy.mock.calls[0]![1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers["X-CSRFToken"]).toBe("abc123");
  });

  test("does not send X-CSRFToken on GET", async () => {
    Object.defineProperty(document, "cookie", {
      configurable: true,
      writable: true,
      value: "csrftoken=abc123",
    });
    fetchSpy.mockResolvedValueOnce(new Response("{}", { status: 200 }));
    await apiFetch("/api/test/");
    const init = fetchSpy.mock.calls[0]![1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers["X-CSRFToken"]).toBeUndefined();
  });

  test("serializes body to JSON and sets Content-Type", async () => {
    fetchSpy.mockResolvedValueOnce(new Response("{}", { status: 200 }));
    await apiFetch("/api/test/", { method: "POST", body: { foo: "bar" } });
    const init = fetchSpy.mock.calls[0]![1] as RequestInit;
    expect(init.body).toBe('{"foo":"bar"}');
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe(
      "application/json",
    );
  });

  test("throws ApiError on non-2xx with envelope shape", async () => {
    fetchSpy.mockResolvedValue(
      new Response(
        JSON.stringify({
          error: {
            code: "validation_error",
            message: "bad input",
            details: { field: "email" },
          },
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );
    let caught: unknown;
    try {
      await apiFetch("/api/test/", { method: "POST" });
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(ApiError);
    const apiErr = caught as ApiError;
    expect(apiErr.status).toBe(400);
    expect(apiErr.code).toBe("validation_error");
    expect(apiErr.message).toBe("bad input");
    expect(apiErr.details).toEqual({ field: "email" });
  });

  test("falls back to status text when error body is not JSON", async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response("internal server error", {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );
    try {
      await apiFetch("/api/test/");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.status).toBe(500);
      expect(apiErr.code).toBe("unknown");
    }
  });
});
