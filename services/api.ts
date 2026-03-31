/**
 * NONVIPAY BACKOFFICE — API Client
 * Client HTTP centralisé pour consommer le backend Django
 * Compatible avec le format de réponse NonviPay { success, ...data }
 */

import type { ApiResponse, ApiError, AuthTokens } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// ── Token Management ── //
const TOKEN_KEY   = "nonvipay_access_token";
const REFRESH_KEY = "nonvipay_refresh_token";

export const tokenStorage = {
  getAccess:  () =>
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY)   : null,
  getRefresh: () =>
    typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null,
  setTokens: (tokens: AuthTokens) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY,   tokens.access);
    localStorage.setItem(REFRESH_KEY, tokens.refresh);
  },
  clearTokens: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

// ── Refresh token state ── //
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ refresh }),
    });
    if (!res.ok) throw new Error("Refresh échoué");
    const data = await res.json();
    tokenStorage.setTokens({
      access:  data.access,
      refresh: data.refresh ?? refresh,
    });
    return data.access;
  } catch {
    tokenStorage.clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }
}

// ── Core fetch ── //
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url         = `${API_BASE_URL}${endpoint}`;
  const accessToken = tokenStorage.getAccess();
  const isFormData  = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (err) {
    return {
      error: {
        message: "Impossible de contacter l'API. Le backend Django est-il démarré sur le port 8000 ?",
        code:    "NETWORK_ERROR",
        details: { cause: [err instanceof Error ? err.message : String(err)] },
      },
      status: 0,
    };
  }

  // ── Auto-refresh sur 401 ── //
  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshAccessToken();
      isRefreshing  = false;

      if (newToken) {
        refreshQueue.forEach((cb) => cb(newToken));
        refreshQueue = [];
        headers.Authorization = `Bearer ${newToken}`;
        try {
          response = await fetch(url, { ...options, headers });
        } catch (err) {
          return {
            error: { message: "Échec réseau après refresh.", code: "NETWORK_ERROR",
                     details: { cause: [String(err)] } },
            status: 0,
          };
        }
      }
    } else {
      const newToken = await new Promise<string>((resolve) => {
        refreshQueue.push(resolve);
      });
      headers.Authorization = `Bearer ${newToken}`;
      try {
        response = await fetch(url, { ...options, headers });
      } catch (err) {
        return {
          error: { message: "Échec après attente refresh.", code: "NETWORK_ERROR",
                   details: { cause: [String(err)] } },
          status: 0,
        };
      }
    }
  }

  const httpStatus = response.status;

  if (httpStatus === 204) {
    return { status: httpStatus };
  }

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const apiError: ApiError = {
      message: json.message ?? json.detail ?? "Une erreur est survenue.",
      code:    json.code,
      details: json.details ?? json.errors ?? json,
    };
    return { error: apiError, status: httpStatus };
  }

  return { data: json as T, status: httpStatus };
}

// ── Méthodes HTTP ── //
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number>) => {
    const url = params
      ? `${endpoint}?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([k, v]) => [k, String(v)])
          )
        ).toString()}`
      : endpoint;
    return apiFetch<T>(url);
  },

  post: <T>(endpoint: string, body?: unknown) =>
    apiFetch<T>(endpoint, {
      method: "POST",
      body:   body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    apiFetch<T>(endpoint, {
      method: "PATCH",
      body:   body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    apiFetch<T>(endpoint, {
      method: "PUT",
      body:   body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    apiFetch<T>(endpoint, { method: "DELETE" }),

  upload: <T>(endpoint: string, formData: FormData) =>
    apiFetch<T>(endpoint, { method: "POST", body: formData }),
};