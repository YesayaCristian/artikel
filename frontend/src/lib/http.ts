const BASE = (import.meta.env.VITE_API_BASE_URL as string).replace(/\/+$/, "");

function getAccessToken() {
  return localStorage.getItem("access_token");
}
function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}
function setAccessToken(token: string) {
  localStorage.setItem("access_token", token);
}
function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function buildUrl(path: string) {
  if (!path.startsWith("/")) path = "/" + path;
  return `${BASE}${path}`;
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const res = await fetch(buildUrl("/api/users/refresh/"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.access) return null;

  setAccessToken(data.access);
  return data.access as string;
}

export async function http<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.headers as any),
  };

  const isFormData = init.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(buildUrl(path), {
    ...init,
    headers,
  });

  // kalau access expired -> refresh 1x
  if (res.status === 401 && retry) {
    const newAccess = await refreshAccessToken();
    if (newAccess) return http<T>(path, init, false);

    clearTokens();
    throw new Error("Unauthorized");
  }

  const data = (await res.json().catch(() => ({}))) as any;

  if (!res.ok) {
    // jangan clear token untuk 404/500
    throw new Error(data?.detail || data?.error || `Request gagal (${res.status})`);
  }

  return data as T;
}
