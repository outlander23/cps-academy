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
    role: "normal",
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
    <form
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-4"
      onSubmit={handleSubmit}
    >
      <h2 className="m-0">
        {isRegister
          ? "Create your CPS Academy account"
          : "Log in to CPS Academy"}
      </h2>
      <p className="m-0 text-gray-600">
        {isRegister
          ? "Pick your role to unlock the right content experience."
          : "Use the credentials seeded in the backend or your newly created account."}
      </p>

      {isRegister && (
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-gray-900">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ada Lovelace"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-gray-900">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@cpsacademy.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold text-gray-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
        />
      </div>

      {isRegister && (
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="font-semibold text-gray-900">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full py-3 px-3.5 rounded-xl border border-gray-300 text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
          >
            <option value="normal">Learner (normal)</option>
            <option value="student">Student</option>
            <option value="social-manager">Social Manager</option>
          </select>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-800 rounded-lg p-3 border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="py-3 px-4.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Just a sec…" : isRegister ? "Create account" : "Log in"}
      </button>
    </form>
  );
};
