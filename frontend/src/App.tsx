import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout";

import DashboardPage from "./pages/admin/DashboardPage";
import ArticlesPage from "./pages/admin/articles";
import CreateArticlePage from "./pages/admin/articles/create";
import EditArticlePage from "./pages/admin/articles/edit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* optional: biar / langsung ke admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/create" element={<CreateArticlePage />} />
          <Route path="articles/edit/:id" element={<EditArticlePage />} />
        </Route>

        {/* fallback biar gak blank kalau route salah */}
        <Route path="*" element={<div style={{ padding: 24 }}>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
