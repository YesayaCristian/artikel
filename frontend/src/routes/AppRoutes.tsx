import { Navigate, useRoutes } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";

export default function AppRoutes() {
  return useRoutes([
    ...publicRoutes,
    ...adminRoutes,

    // fallback global
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
