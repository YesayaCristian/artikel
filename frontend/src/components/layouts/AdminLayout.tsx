import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    if (pathname.startsWith("/admin/articles")) return "Articles";
    if (pathname === "/admin") return "Dashboard";
    return "Admin";
  }, [pathname]);

  const linkClass =
    "group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition";

  const navLink = (isActive: boolean) =>
    cn(
      linkClass,
      isActive
        ? "bg-primary-50 text-primary-700 ring-1 ring-primary-100"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 md:hidden"
                aria-label="Open sidebar"
              >
                ☰
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft md:flex">
                  A
                </div>
                <div>
                  <div className="text-xs text-slate-500">Admin Panel</div>
                  <h1 className="text-lg font-semibold text-slate-900 leading-tight">
                    {pageTitle}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm">
                <span className="text-slate-400">⌕</span>
                <input
                  className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Search (coming soon)"
                />
              </div>

              <button className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] md:gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-20 rounded-3xl border bg-white p-3 shadow-soft">
              <div className="mb-3 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 p-4 text-white">
                <div className="h-11 w-11 rounded-3xl bg-white/15 flex items-center justify-center font-bold">
                  A
                </div>
                <div className="leading-tight">
                  <div className="text-sm opacity-90">Artikel</div>
                  <div className="font-semibold">Admin</div>
                </div>
              </div>

              <nav className="space-y-1">
                <NavLink to="/admin" end className={({ isActive }) => navLink(isActive)}>
                  <span className="text-lg">🏠</span>
                  Dashboard
                </NavLink>

                <NavLink to="/admin/articles" className={({ isActive }) => navLink(isActive)}>
                  <span className="text-lg">📝</span>
                  Articles
                </NavLink>
              </nav>

              <div className="mt-4 rounded-3xl bg-slate-50 p-3">
                <div className="text-xs text-slate-500">Tip</div>
                <div className="text-sm font-semibold text-slate-800">
                  Draft dulu, publish belakangan.
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile drawer */}
          <div className={cn("fixed inset-0 z-50 md:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
            <div
              className={cn("absolute inset-0 bg-slate-900/40 transition-opacity", open ? "opacity-100" : "opacity-0")}
              onClick={() => setOpen(false)}
            />
            <div
              className={cn(
                "absolute left-0 top-0 h-full w-[84%] max-w-xs bg-white shadow-soft transition-transform",
                open ? "translate-x-0" : "-translate-x-full"
              )}
            >
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-900">Admin Panel</div>
                  <button onClick={() => setOpen(false)} className="rounded-2xl border px-3 py-2 text-sm hover:bg-slate-50">
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-3">
                <nav className="space-y-1">
                  <NavLink to="/admin" end className={({ isActive }) => navLink(isActive)} onClick={() => setOpen(false)}>
                    <span className="text-lg">🏠</span>
                    Dashboard
                  </NavLink>

                  <NavLink to="/admin/articles" className={({ isActive }) => navLink(isActive)} onClick={() => setOpen(false)}>
                    <span className="text-lg">📝</span>
                    Articles
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <main className="py-6 md:py-8">
            <div className="rounded-3xl border bg-white p-4 sm:p-6 shadow-soft">
              <Outlet />
            </div>

            <footer className="mt-6 text-center text-xs text-slate-500">
              © {new Date().getFullYear()} Artikel Admin • White & Blue UI
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
