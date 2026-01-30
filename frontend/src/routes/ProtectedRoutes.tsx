import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

function getAccessToken() {
  return localStorage.getItem("access_token");
}
function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

type GuardState =
  | { phase: "checking"; token: string | null }
  | { phase: "deny"; token: string | null; reason: string; status?: number; body?: any }
  | { phase: "allow"; token: string };

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GuardState>({ phase: "checking", token: getAccessToken() });

  useEffect(() => {
    let alive = true;

    (async () => {
      const token = getAccessToken();
      if (!token) {
        if (alive) setState({ phase: "deny", token: null, reason: "NO_TOKEN (access_token kosong di localStorage)" });
        return;
      }

      try {
        const res = await fetch(`${BASE}/api/users/me/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const body = await res.json().catch(() => ({}));

        if (!res.ok) {
          clearTokens();
          if (alive) setState({ phase: "deny", token, reason: "ME_ENDPOINT_NOT_OK", status: res.status, body });
          return;
        }

        if (!body?.is_staff) {
          clearTokens();
          if (alive) setState({ phase: "deny", token, reason: "NOT_ADMIN (is_staff false)", status: res.status, body });
          return;
        }

        if (alive) setState({ phase: "allow", token });
      } catch (e: any) {
        clearTokens();
        if (alive) setState({ phase: "deny", token: getAccessToken(), reason: "FETCH_FAILED (CORS / network)", body: String(e?.message || e) });
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (state.phase === "checking") {
    return <div className="p-6 text-black">Checking session...</div>;
  }

  if (state.phase === "deny") {
    // sementara jangan langsung redirect biar kelihatan penyebabnya
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-blue-50">
        <div className="max-w-xl w-full bg-white border border-blue-100 rounded-2xl p-6">
          <div className="text-xl font-bold text-black mb-2">Admin Guard Blocked</div>
          <div className="text-black/80 mb-4">Reason: <b>{state.reason}</b></div>

          <div className="text-sm text-black/70 space-y-2">
            <div><b>BASE</b>: {BASE}</div>
            <div><b>Token exists</b>: {state.token ? "YES" : "NO"}</div>
            {state.status !== undefined ? <div><b>Status</b>: {state.status}</div> : null}
            {state.body !== undefined ? (
              <pre className="mt-2 p-3 bg-blue-50 rounded-xl overflow-auto text-xs text-black">
                {JSON.stringify(state.body, null, 2)}
              </pre>
            ) : null}
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => window.location.href = "/login"}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // allow
  return <>{children}</>;
}
