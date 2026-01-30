import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE}/api/users/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.detail || "Login gagal");

      // ✅ simpan token
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // ✅ redirect ke admin root (atau /admin/articles kalau itu yang ada)
      navigate("/admin", { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-black mb-2">Admin Login</h1>
          <p className="text-black/70">Masuk untuk mengelola artikel</p>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-blue-100 p-7">
          {err ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {err}
            </div>
          ) : null}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 rounded-xl border border-blue-200 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-blue-200 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
