import { Navigate, Outlet } from "react-router-dom";
import { useValidateAuthQuery } from "@/api/authApi";

const ProtectedRoute = () => {
  const { data, isLoading } = useValidateAuthQuery();

  if (isLoading) return null;

  if (!data?.authenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ STORE USER (IMPORTANT)
  localStorage.setItem("user", JSON.stringify(data.user));

  return <Outlet />;
};

export default ProtectedRoute;