import { Navigate, Outlet } from "react-router-dom";
import { useValidateAuthQuery } from "@/api/authApi";

const PublicRoute = () => {
  const { data, isLoading } = useValidateAuthQuery();

  // Wait for auth check
  if (isLoading) return null;

  // If authenticated → redirect away from login/signup
  if (data?.authenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
