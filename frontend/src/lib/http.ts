import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./auth";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(`${BASE}/api/users/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || "Refresh gagal");

  // SimpleJWT returns { access }
  setTokens(data.access, refresh);
  return data.access as string;
}

export async function http<T>(path: string, opts: RequestInit = {}, retry = true): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      Accept: "application/json",
      ...(opts.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // 401 -> coba refresh sekali
  if (res.status === 401 && retry) {
    try {
      await refreshAccessToken();
      return http<T>(path, opts, false);
    } catch {
      clearTokens();
      throw new Error("Session habis. Silakan login lagi.");
    }
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.error || data?.detail || `${res.status} ${res.statusText}`);
  }

  return data as T;
}

export async function httpForm<T>(path: string, form: FormData, method: "POST" | "PUT" | "PATCH" = "POST") {
  const token = getAccessToken();

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: form,
  });

  if (res.status === 401) {
    // refresh then retry once
    await refreshAccessToken();
    return httpForm<T>(path, form, method);
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) throw new Error(data?.error || data?.detail || `${res.status} ${res.statusText}`);
  return data as T;
}
    