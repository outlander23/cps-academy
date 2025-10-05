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
    <div className="min-h-screen">
      {/* Enhanced Navbar with glassmorphism */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with gradient */}
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-3xl transform group-hover:scale-110 transition-transform duration-200">
                🎓
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CPS Academy
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <>
                  {user.role === "developer" && (
                    <NavLink
                      to="/manage/courses"
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-md"
                        }`
                      }
                    >
                      Manage Courses
                    </NavLink>
                  )}
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                    {roleLabels[user.role] ?? user.role}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Create account
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 CPS Academy. Empowering creative tech careers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
