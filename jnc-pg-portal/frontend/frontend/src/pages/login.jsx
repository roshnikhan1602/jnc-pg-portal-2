import { useState } from "react";
import { useLoginUserMutation } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation (same as your original)
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await loginUser({ email, password }).unwrap();
      navigate("/home");
    } catch (err) {
      if (err?.data?.message) {
        setError(err.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen -mt-16 items-center justify-center bg-[#F2F2F2] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/src/assets/jnc-logo.png"
            alt="JNC Logo"
            className="w-full mx-auto"
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-center mb-3 text-sm">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F6F6F6] border border-gray-300 p-2 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F6F6F6] border border-gray-300 p-2 rounded"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right -mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-[#2F2F6F] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2F2F6F] text-white py-2 rounded font-medium hover:bg-[#1f1f4f] transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#2F2F6F] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
