import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminMobileDrawer from "./AdminMobileDrawer";
import { clearTokens } from "../../../lib/auth"; // sesuaikan path jika beda

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pageTitle = useMemo(() => {
    if (pathname.startsWith("/admin/articles")) return "Articles";
    if (pathname.startsWith("/admin/categories")) return "Categories";
    if (pathname.startsWith("/admin/tags")) return "Tags";
    if (pathname === "/admin" || pathname.startsWith("/admin/dashboard")) return "Dashboard";
    return "Admin";
  }, [pathname]);

  const handleLogout = () => {
    clearTokens();
    navigate("/admin/login", { replace: true });
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
          </main>
        </div>
      </div>
    </div>
  );
}
