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
import ProfessorDetailPage from "../pages/admin/professors/detail";
import AdminFacultiesPage from "../pages/admin/faculties/";
import CreateFacultyPage from "../pages/admin/faculties/create"
import EditFacultyPage from "../pages/admin/faculties/edit";
import AdminStudyProgramPage from "../pages/admin/study_program/";
import CreateStudyProgramPage from "../pages/admin/study_program/create"
import EditStudyProgramPage from "../pages/admin/study_program/edit";
import AdminCoursesPage from "../pages/admin/course";
import CreateCoursePage from "../pages/admin/course/create";
import EditCoursePage from "../pages/admin/course/edit";
import ArticleDetailPage from "../pages/admin/articles/detail";


const adminRoutes: RouteObject[] = [
  
  {
    path: "/",
    element: <Navigate to="/admin/login" replace />, // root diarahkan ke login
  },
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
          { path: "articles/:id", element: <ArticleDetailPage /> },

          {path : "professors", element: <AdminProfessorsPage />},
          {path : "professors/create", element: <CreateProfessorPage />},
          {path : "professors/edit/:id", element: <EditProfessorPage />},
          {path: "professors/detail/:id", element: <ProfessorDetailPage />,},

          {path : "faculties", element: <AdminFacultiesPage/>},
          {path : "faculties/create", element: <CreateFacultyPage/>},
          {path : "faculties/edit/:id", element: <EditFacultyPage/>},

          {path : "study_program", element: <AdminStudyProgramPage/>},
          {path : "study_program/create", element: <CreateStudyProgramPage/>},
          {path : "study_program/edit/:id", element: <EditStudyProgramPage/>},

          {path: "course", element: <AdminCoursesPage />,},
          {path: "course/create", element: <CreateCoursePage />,},
          {path: "course/edit/:id", element: <EditCoursePage />,},

          { path: "categories", element: <CategoriesPage /> },
          { path: "tags", element: <TagsPage /> },


          
          

          { path: "*", element: <Navigate to="dashboard" replace /> },
        ],
      },
    ],
  },
];

export default adminRoutes;
