import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layouts/admin/AdminLayout";

import DashboardPage from "./pages/admin/DashboardPage";
import AdminArticlesPage from "./pages/admin/articles";
import CreateArticlePage from "./pages/admin/articles/create";
import EditArticlePage from "./pages/admin/articles/edit";

import CategoriesPage from "./pages/admin/categories";
import TagsPage from "./pages/admin/tags";

import LandingPage from "./pages/public/LandingPage";
import ArticlesPage from "./pages/public/ArticlePage";
import ArticleDetailPage from "./pages/public/ArticleDetailPage";
import LoginPage from "./pages/admin/LoginAdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />

        {/* ADMIN LOGIN (di luar layout admin) */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="articles" element={<AdminArticlesPage />} />
          <Route path="articles/create" element={<CreateArticlePage />} />
          <Route path="articles/edit/:id" element={<EditArticlePage />} />

          <Route path="categories" element={<CategoriesPage />} />
          <Route path="tags" element={<TagsPage />} />

          {/* fallback untuk /admin/... */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* fallback global */}
        <Route path="*" element={<div style={{ padding: 24 }}>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
