import { Navigate, useRoutes } from "react-router-dom";
// import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";

export default function AppRoutes() {
  return useRoutes([
    // ...publicRoutes,
    ...adminRoutes,

    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
