import type { RouteObject } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import ArticlesPage from "../pages/public/ArticlePage";
import ArticleDetailPage from "../pages/public/ArticleDetailPage";

const publicRoutes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/articles", element: <ArticlesPage /> },
  { path: "/articles/:id", element: <ArticleDetailPage /> },
];

export default publicRoutes;
