import { Navigate, Outlet } from "react-router-dom";
import { useValidateAuthQuery } from "@/api/authApi";

const FacultyProtectedRoute = () => {
  const { data, isLoading } = useValidateAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Wait while checking auth
  if (isLoading) {
    return <p className="text-center mt-10">Checking access...</p>;
  }


  // Not logged in → send to login
  if (!data?.authenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not faculty → block access
  if (data?.user?.role !== "faculty") {
    if (data?.user?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  }

  // Logged in + admin
  return <Outlet />;
};

export default FacultyProtectedRoute;
