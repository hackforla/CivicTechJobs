/**
 * Browser-side fetch wrapper for the CTJ JSON API.
 *
 * Three jobs the wrapper does:
 *
 * 1. **Cookie credentials.** Sets `credentials: "include"` so the
 *    `sessionid` and `csrftoken` cookies ride along on every
 *    request. Same-origin via Next rewrites means cookies always
 *    apply; no CORS gymnastics needed.
 * 2. **CSRF header.** Reads `csrftoken` from `document.cookie` and
 *    sends it as `X-CSRFToken` on every mutating method. The cookie
 *    is seeded on app load by `GET /api/auth/csrf/`. Sending the
 *    header on signup / login is harmless (DRF ignores it
 *    pre-session); sending it on authenticated mutations is required
 *    by `SessionAuthentication`'s CSRF check.
 * 3. **Error envelope unwrapping.** Non-2xx responses are parsed
 *    into an `ApiError` with `status`, `code`, `message`, `details`
 *    pulled from the `civic_exception_handler` envelope shape (see
 *    `docs/developer/backend.md` "Error envelope"). Callers can
 *    discriminate by `err.code` ("validation_error", "permission_denied",
 *    etc.) without parsing JSON themselves.
 *
 * Same-origin contract: `path` should be a server-relative URL
 * (e.g. `"/api/auth/me/"`). Absolute URLs work but bypass the
 * Next-rewrites layer and may hit CORS in production.
 */

// Internal: shape of the structured error envelope returned by
// Django's `unified_exception_handler`. Not exported - consumers
// should read `ApiError.code` / `.message` / `.fields` instead of
// parsing the raw body themselves.
type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
  };
};

export class ApiError extends Error {
  status: number;
  code: string;
  fields?: Record<string, string[]>;

  constructor(
    status: number,
    code: string,
    message: string,
    fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: Method;
  body?: unknown;
  headers?: Record<string, string>;
};

const MUTATING_METHODS = new Set<Method>(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * Read a cookie value by name from `document.cookie`.
 *
 * Returns `undefined` outside the browser (SSR) or when the cookie
 * isn't set yet. Caller code must tolerate the missing-cookie case
 * (the only consumer is the CSRF header path, where missing -> no
 * header sent, which is correct for pre-csrf-seed requests).
 */
function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const prefix = `${name}=`;
  for (const chunk of document.cookie.split(";")) {
    const trimmed = chunk.trim();
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length));
    }
  }
  return undefined;
}

/**
 * Issue a JSON request and return the parsed response body.
 *
 * Throws `ApiError` on non-2xx. Returns `undefined` on 204 No
 * Content (the type parameter `T` should be `void` in that case).
 */
export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const method: Method = options.method ?? "GET";
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.body !== undefined
      ? { "Content-Type": "application/json" }
      : {}),
    ...options.headers,
  };
  if (MUTATING_METHODS.has(method)) {
    const csrf = readCookie("csrftoken");
    if (csrf) headers["X-CSRFToken"] = csrf;
  }

  const response = await fetch(path, {
    method,
    credentials: "include",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let body: ApiErrorBody | null = null;
    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      // Response body wasn't JSON (or empty); fall through to a
      // synthesized envelope so callers always see the same shape.
    }
    throw new ApiError(
      response.status,
      body?.error?.code ?? "unknown",
      body?.error?.message ?? response.statusText,
      body?.error?.fields,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}
