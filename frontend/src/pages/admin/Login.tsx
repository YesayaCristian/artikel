import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = (import.meta.env.VITE_API_BASE_URL as string) || "";

type LoginResponse = {
  access?: string;
  refresh?: string;
  detail?: string;
  message?: string;
  expires_in?: number; // optional kalau backend kasih
};

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const canSubmit = useMemo(() => {
    return !!username.trim() && !!password.trim() && !loading;
  }, [username, password, loading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    if (!BASE) {
      setErr("VITE_API_BASE_URL belum di-set. Cek file .env kamu.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE}/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      let data: LoginResponse = {};
      try {
        data = (await res.json()) as LoginResponse;
      } catch {
        data = {};
      }

      if (!res.ok) {
        const msg = data.detail || data.message || "Login gagal";
        throw new Error(msg);
      }

      if (!data.access || !data.refresh) {
        throw new Error("Token tidak ditemukan dari response login.");
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      if (typeof data.expires_in === "number") {
        const exp = Date.now() + data.expires_in * 1000;
        localStorage.setItem("access_expires_at", String(exp));
      }

      navigate("/admin", { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            {/* simple lock icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10V8a5 5 0 0 1 10 0v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Masuk untuk mengelola artikel & konten.
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600" />

          <div className="p-7">
            {err ? (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <div className="font-semibold">Gagal login</div>
                <div className="mt-0.5 text-red-700/90">{err}</div>
              </div>
            ) : null}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-800">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  autoComplete="username"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-800">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="pt-1 text-center text-xs text-slate-500">
                Pastikan akun kamu punya akses admin.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
