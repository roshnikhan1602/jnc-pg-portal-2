import { useState } from "react";
import { useSignupUserMutation } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [signupUser, { isLoading }] = useSignupUserMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!form.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!form.password.trim())
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    try {
      const dataToSend = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };

      await signupUser(dataToSend).unwrap();

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err?.data?.message === "Email already exists") {
        setErrors({ email: "Email already exists" });
      } else {
        setErrors({ email: "Signup failed, try again" });
      }
    }
  };

  return (
    <div className="flex min-h-screen -mt-10 items-center justify-center bg-[#F2F2F2] px-4">
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
          Create an Account
        </h2>

        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FIRST NAME + LAST NAME */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1 text-sm">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={`w-full bg-[#F6F6F6] border p-2 rounded 
                ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 mb-1 text-sm">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={`w-full bg-[#F6F6F6] border p-2 rounded 
                ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full bg-[#F6F6F6] border p-2 rounded 
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full bg-[#F6F6F6] border p-2 rounded 
              ${errors.phone ? "border-red-500" : "border-gray-300"}`}
              placeholder="10-digit phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full bg-[#F6F6F6] border p-2 rounded 
              ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter a password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full bg-[#F6F6F6] border p-2 rounded 
              ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2F2F6F] text-white py-2 rounded hover:bg-[#1f1f4f] transition"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2F2F6F] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
