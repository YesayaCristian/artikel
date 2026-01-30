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

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      const token = getAccessToken();

      if (!token) {
        if (alive) {
          setAllowed(false);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`${BASE}/api/users/me/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        // ✅ HANYA hapus token kalau memang unauthorized
        if (res.status === 401 || res.status === 403) {
          clearTokens();
          if (alive) setAllowed(false);
          return;
        }

        // kalau error lain (404/500/CORS response), jangan hapus token
        if (!res.ok) {
          if (alive) setAllowed(false);
          return;
        }

        if (!data?.is_staff) {
          // bukan admin => hapus token biar ga nyangkut
          clearTokens();
          if (alive) setAllowed(false);
          return;
        }

        if (alive) setAllowed(true);
      } catch {
        // network/CORS error: jangan hapus token dulu
        if (alive) setAllowed(false);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="p-6 text-black">Loading...</div>;
  if (!allowed) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
