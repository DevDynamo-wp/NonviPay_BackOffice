/**
 * NONVIPAY BACKOFFICE — API Client
 * Client HTTP centralise pour consommer le backend Django
 * Gestion : JWT, refresh token, erreurs globales
 */

import type { ApiResponse, ApiError, AuthTokens } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// ── Token Management ── //
const TOKEN_KEY = "nonvipay_access_token";
const REFRESH_KEY = "nonvipay_refresh_token";

export const tokenStorage = {
  getAccess: () =>
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
  getRefresh: () =>
    typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null,
  setTokens: (tokens: AuthTokens) => {
    localStorage.setItem(TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_KEY, tokens.refresh);
  },
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

// ── Refresh Token Logic ── //
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) throw new Error("Refresh failed");
    const data = await res.json();
    tokenStorage.setTokens({
      access: data.access,
      refresh: data.refresh ?? refresh,
    });
    return data.access;
  } catch {
    tokenStorage.clearTokens();
    window.location.href = "/login";
    return null;
  }
}

// ── Core Fetch ── //
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const accessToken = tokenStorage.getAccess();
  const isFormDataBody = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormDataBody ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (error) {
    return {
      error: {
        message:
          "Impossible de contacter l'API. Verifie que le backend est lance et que NEXT_PUBLIC_API_URL est correct.",
        code: "NETWORK_ERROR",
        details: {
          endpoint: [endpoint],
          cause: [error instanceof Error ? error.message : String(error)],
        },
      },
      status: 0,
    };
  }

  // ── Auto-refresh on 401 ── //
  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshAccessToken();
      isRefreshing = false;

      if (newToken) {
        refreshQueue.forEach((cb) => cb(newToken));
        refreshQueue = [];
        headers.Authorization = `Bearer ${newToken}`;
        try {
          response = await fetch(url, { ...options, headers });
        } catch (error) {
          return {
            error: {
              message: "Echec reseau apres refresh du token.",
              code: "NETWORK_ERROR",
              details: {
                endpoint: [endpoint],
                cause: [error instanceof Error ? error.message : String(error)],
              },
            },
            status: 0,
          };
        }
      }
    } else {
      // Attendre la file
      const newToken = await new Promise<string>((resolve) => {
        refreshQueue.push(resolve);
      });
      headers.Authorization = `Bearer ${newToken}`;
      try {
        response = await fetch(url, { ...options, headers });
      } catch (error) {
        return {
          error: {
            message: "Echec reseau apres attente du refresh token.",
            code: "NETWORK_ERROR",
            details: {
              endpoint: [endpoint],
              cause: [error instanceof Error ? error.message : String(error)],
            },
          },
          status: 0,
        };
      }
    }
  }

  const status = response.status;

  if (response.status === 204) {
    return { status };
  }

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error: ApiError = {
      message: json.detail ?? json.message ?? "Une erreur est survenue",
      code: json.code,
      details: json.details ?? json,
    };
    return { error, status };
  }

  return { data: json as T, status };
}

// ── HTTP Methods ── //
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number>) => {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params as Record<string, string>).toString()}`
      : endpoint;
    return apiFetch<T>(url);
  },

  post: <T>(endpoint: string, body?: unknown) =>
    apiFetch<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    apiFetch<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    apiFetch<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: "DELETE" }),

  // Multipart pour upload de fichiers (KYC)
  upload: <T>(endpoint: string, formData: FormData) =>
    apiFetch<T>(endpoint, {
      method: "POST",
      body: formData,
      headers: {} as Record<string, string>, // Laisser browser definir Content-Type
    }),
};
