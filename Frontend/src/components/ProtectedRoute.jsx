import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { token, user } = useUserStore();

  if (!token) return <Navigate to="/" />;
  if (adminOnly && user?.role !== "admin") return <Navigate to="/home" />;

  return <Outlet />;
};

export default ProtectedRoute;
