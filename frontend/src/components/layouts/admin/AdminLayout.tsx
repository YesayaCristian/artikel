import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminMobileDrawer from "./AdminMobileDrawer";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    if (pathname.startsWith("/admin/articles")) return "Articles";
    if (pathname === "/admin") return "Dashboard";
    return "Admin";
  }, [pathname]);

  const handleLogout = () => {
    // TODO: isi logout (hapus token / redirect / panggil API)
    console.log("logout");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar
        pageTitle={pageTitle}
        onOpenSidebar={() => setOpen(true)}
        onLogout={handleLogout}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] md:gap-6">
          <AdminSidebar />

          <AdminMobileDrawer open={open} onClose={() => setOpen(false)} />

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
