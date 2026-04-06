import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }

    setSuccess("A password reset link has been sent to your email.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2F2F2] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/src/assets/jnc-logo.png"
            alt="JNC Logo"
            className="w-full mx-auto"
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-[#2F2F6F] mb-4">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your registered email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-[#F6F6F6] border p-2 rounded 
                ${error ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your email"
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#2F2F6F] text-white py-2 rounded hover:bg-[#1f1f4f] transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Remember your password?{" "}
          <a href="/login" className="text-[#2F2F6F] font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
