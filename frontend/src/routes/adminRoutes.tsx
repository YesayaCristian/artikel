import type { RouteObject } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import AdminAuthGate from "./AuthGate";

import AdminLayout from "../components/layouts/admin/AdminLayout";

import AdminLoginPage from "../pages/admin/Login";
import DashboardPage from "../pages/admin/Dashboard";
import AdminArticlesPage from "../pages/admin/articles";
import CreateArticlePage from "../pages/admin/articles/create";
import EditArticlePage from "../pages/admin/articles/edit";
import CategoriesPage from "../pages/admin/categories";
import TagsPage from "../pages/admin/tags";
import AdminProfessorsPage from "../pages/admin/professors";
import CreateProfessorPage from "../pages/admin/professors/create";
import EditProfessorPage from "../pages/admin/professors/edit";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <Outlet />, 
    children: [
      {
        path: "login",
        element: (
          <AdminAuthGate>
            <AdminLoginPage />
          </AdminAuthGate>
        ),
      },

      {
        element: (
          <ProtectedRoutes>
            <AdminLayout />
          </ProtectedRoutes>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },

          { path: "dashboard", element: <DashboardPage /> },

          { path: "articles", element: <AdminArticlesPage /> },
          { path: "articles/create", element: <CreateArticlePage /> },
          { path: "articles/edit/:id", element: <EditArticlePage /> },

          {path : "professors", element: <AdminProfessorsPage />},
          {path : "professors/create", element: <CreateProfessorPage />},
          {path : "professors/edit/:id", element: <EditProfessorPage />},

          { path: "categories", element: <CategoriesPage /> },
          { path: "tags", element: <TagsPage /> },

          

          { path: "*", element: <Navigate to="dashboard" replace /> },
        ],
      },
    ],
  },
];

export default adminRoutes;
