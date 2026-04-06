import { useLogoutUserMutation } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authApi } from "@/api/authApi";

function LogoutButton({ className = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      // 🔥 RESET ALL RTK QUERY CACHE (CRITICAL)
      dispatch(authApi.util.resetApiState());

      // 🔥 NAVIGATE IMMEDIATELY
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`px-4 py-2 bg-red-600 text-white rounded ${className}`}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutButton;
