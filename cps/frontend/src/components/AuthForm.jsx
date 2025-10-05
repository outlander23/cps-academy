import React, { useState } from "react";
import { loginUser, registerUser } from "../api/auth.js";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../providers/ToastProvider.jsx";

export const AuthForm = ({ mode = "login" }) => {
  const isRegister = mode === "register";
  const { login } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      }

      const response = isRegister
        ? await registerUser(payload)
        : await loginUser(payload);

      login(response);
      showToast({
        type: "success",
        title: isRegister ? "Account created" : "Welcome back",
        message: isRegister
          ? "Your account has been created successfully!"
          : "You’re now logged in.",
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
    <form
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-7 transition-all duration-300"
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-500 text-sm">
          {isRegister
            ? "Join us and start learning today!"
            : "Login to continue your learning journey."}
        </p>
      </div>

      {/* Name Field (Register Only) */}
      {isRegister && (
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
            👤 Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ada Lovelace"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full py-3 px-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-300 transition-all duration-200"
          />
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-gray-700 flex items-center gap-2"
        >
          📧 Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@cpsacademy.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full py-3 px-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-300 transition-all duration-200"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-700 flex items-center gap-2"
        >
          🔒 Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full py-3 px-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white hover:border-gray-300 transition-all duration-200"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-700 rounded-xl p-4 border border-red-200 flex items-start gap-3 animate-fadeIn">
          <span className="text-lg">⚠️</span>
          <span className="flex-1">{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> Please wait…
          </span>
        ) : isRegister ? (
          "✨ Create Account"
        ) : (
          "🚀 Log In"
        )}
      </button>
    </form>
  );
};
