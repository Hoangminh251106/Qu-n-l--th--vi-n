import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function AdminRoute() {
  const { isAuthed, role } = useAuth();
  if (!isAuthed) return <Navigate to="/login" replace />;
  if (role !== "Admin") return <Navigate to="/" replace />;
  return <Outlet />;
}

