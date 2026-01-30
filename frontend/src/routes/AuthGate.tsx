import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

function getAccessToken() {
  return localStorage.getItem("access_token");
}

export default function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      const token = getAccessToken();
      if (!token) {
        if (alive) {
          setIsAuthed(false);
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

        if (res.ok && data?.is_staff) {
          if (alive) setIsAuthed(true);
        } else {
          if (alive) setIsAuthed(false);
        }
      } catch {
        if (alive) setIsAuthed(false);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="p-6 text-black">Loading...</div>;
  if (isAuthed) return <Navigate to="/admin" replace />;

  return <>{children}</>;
}
