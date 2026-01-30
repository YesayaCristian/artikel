import { setTokens } from "../lib/auth";
import { http } from "../lib/http";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${BASE}/api/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || "Login gagal");

  setTokens(data.access, data.refresh);
  return data as { access: string; refresh: string; user?: any };
}

export async function me() {
  return http<{ id: number; username: string; email: string; is_staff: boolean }>(
    "/api/users/me/"
  );
}
