import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../../pages/public/LandingPage";
import ArticlesPage from "../../pages/public/ArticlePage";
import ArticleDetailPage from "../../pages/public/ArticleDetailPage";

import LoginPage from "../../pages/public/LoginAdminPage";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:id" element={<ArticleDetailPage />} />


      <Route path="/admin/login" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
