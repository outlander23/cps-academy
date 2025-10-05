import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Assuming you install @heroicons/react for icons
import { loginUser, registerUser } from "../api/auth.js";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../providers/ToastProvider.jsx";

export const AuthForm = ({ mode = "login", onModeSwitch }) => {
  const isRegister = mode === "register";
  const { login } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "normal",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
      };

      if (isRegister) {
        payload.name = form.name.trim();
        payload.role = form.role;
      }

      const response = isRegister
        ? await registerUser(payload)
        : await loginUser(payload);

      login(response);
      showToast({
        type: "success",
        title: isRegister ? "Account created" : "Welcome back",
        message: isRegister
          ? "You're all set! Explore courses tailored to your role."
          : "You are now signed in.",
      });
    } catch (apiError) {
      const message =
        apiError.response?.data?.message ||
        apiError.response?.data?.error ||
        "We couldn't process your request.";
      setError(message);
      showToast({
        type: "error",
        title: "Request failed",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 animate-fade-in">
      <form
        className="backdrop-blur-lg bg-white/95 rounded-3xl shadow-2xl p-10 max-w-md w-full space-y-8 border border-gray-100/50 transform transition-all duration-500 hover:scale-105"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-shift">
            {isRegister ? "Join CPS Academy" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-lg">
            {isRegister
              ? "Unlock tailored learning paths for your creative tech journey."
              : "Sign in to continue building your skills."}
          </p>
        </div>

        {isRegister && (
          <div className="relative space-y-1 animate-slide-up">
            <label
              htmlFor="name"
              className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-200"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full py-4 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white/50 hover:border-blue-300"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                👤
              </span>
            </div>
          </div>
        )}

        <div className="relative space-y-1 animate-slide-up delay-100">
          <label
            htmlFor="email"
            className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-200"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full py-4 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white/50 hover:border-blue-300"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              📧
            </span>
          </div>
        </div>

        <div className="relative space-y-1 animate-slide-up delay-200">
          <label
            htmlFor="password"
            className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-200"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full py-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white/50 hover:border-blue-300"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔒
            </span>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isRegister && (
          <div className="relative space-y-1 animate-slide-up delay-300">
            <label
              htmlFor="role"
              className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-200"
            >
              Your Role
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full py-4 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-800 appearance-none transition-all duration-300 bg-white/50 hover:border-blue-300 cursor-pointer"
              >
                <option value="normal">👨‍🎓 Learner</option>
                <option value="student">📚 Student</option>
                <option value="social-manager">📱 Social Manager</option>
              </select>
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                🎭
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 rounded-2xl p-4 border border-red-300 flex items-center gap-3 animate-shake">
            <span className="text-xl">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin text-xl">⏳</span> Processing...
            </>
          ) : isRegister ? (
            <>Create Account ✨</>
          ) : (
            <>Sign In 🚀</>
          )}
        </button>

        {/* Mode Switch Footer */}
        <div className="text-center text-gray-600">
          {isRegister ? "Already have an account?" : "New to CPS Academy?"}{" "}
          <button
            type="button"
            onClick={() => onModeSwitch(isRegister ? "login" : "register")}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};
