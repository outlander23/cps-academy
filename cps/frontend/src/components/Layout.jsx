import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const roleLabels = {
  normal: "Learner",
  student: "Student",
  "social-manager": "Social Manager",
  developer: "Developer",
};

export const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="grid grid-cols-1 min-h-screen">
      <div className="max-w-7xl w-full mx-auto px-8 py-8 pb-12">
        <nav className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-3 nav-brand">
            <span role="img" aria-label="CPS logo">
              🎓
            </span>
            <span className="text-xl font-bold">CPS Academy</span>
          </Link>

          <div className="flex items-center gap-3 nav-actions">
            {isAuthenticated && user ? (
              <>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full py-1.5 px-3 bg-blue-50 text-blue-700">
                  {roleLabels[user.role] ?? user.role}
                </span>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="py-3 px-4 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="py-3 px-4 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  className="py-3 px-4.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                >
                  Create account
                </NavLink>
              </>
            )}
          </div>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
};
