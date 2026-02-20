import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminMobileDrawer from "./AdminMobileDrawer";
import { clearTokens } from "../../../lib/auth";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pageTitle = useMemo(() => {
    if (pathname.startsWith("/admin/articles")) return "Articles";
    if (pathname.startsWith("/admin/categories")) return "Categories";
    if (pathname.startsWith("/admin/tags")) return "Tags";
    if (pathname === "/admin" || pathname.startsWith("/admin/dashboard"))
      return "Dashboard";
    return "Admin";
  }, [pathname]);

  const handleLogout = () => {
    clearTokens();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar desktop */}
      <AdminSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <AdminMobileDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <AdminNavbar
          pageTitle={pageTitle}
          onOpenSidebar={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main
          className={`flex-1 py-6 md:py-8 px-4 sm:px-6 transition-all duration-300 ${
            sidebarOpen ? "md:ml-64" : "md:ml-0"
          }`}
        >
          <div className={`max-w-7xl mx-auto p-4 sm:p-6 ${pathname.startsWith("/admin/course/create") ? "bg-transparent border-none shadow-none rounded-none" : "bg-white border rounded-3xl shadow-soft"}`}>
            <Outlet />
          </div>

          <footer className="mt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Artikel Admin • Institut Teknologi
          </footer>
        </main>
      </div>
    </div>
  );
}