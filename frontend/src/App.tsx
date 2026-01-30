import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";

// public
import LandingPage from "./pages/public/LandingPage";
import ArticlesPage from "./pages/public/ArticlePage";
import ArticleDetailPage from "./pages/public/ArticleDetailPage";

// admin
import AdminLayout from "./components/layouts/admin/AdminLayout";
import AdminLoginPage from "./pages/admin/Login";
import DashboardPage from "./pages/admin/Dashboard";
import AdminArticlesPage from "./pages/admin/articles";
import CreateArticlePage from "./pages/admin/articles/create";
import EditArticlePage from "./pages/admin/articles/edit";
import CategoriesPage from "./pages/admin/categories";
import TagsPage from "./pages/admin/tags";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== PUBLIC ========== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />

        {/* ========== ADMIN LOGIN (PUBLIC ACCESS) ========== */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ========== ADMIN AREA (PROTECTED) ========== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          {/* /admin -> /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="articles" element={<AdminArticlesPage />} />
          <Route path="articles/create" element={<CreateArticlePage />} />
          <Route path="articles/edit/:id" element={<EditArticlePage />} />

          <Route path="categories" element={<CategoriesPage />} />
          <Route path="tags" element={<TagsPage />} />

          {/* unknown admin path -> balik dashboard */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* fallback global */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
