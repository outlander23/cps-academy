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
    // Make the full page a flex container
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-indigo-200/30 shadow-lg shadow-indigo-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-3xl transform group-hover:scale-110 transition-transform duration-200">
                🎓
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                CPS Academy
              </span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <>
                  {user.role === "developer" && (
                    <NavLink
                      to="/manage/courses"
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg"
                            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:shadow-md"
                        }`
                      }
                    >
                      Manage Courses
                    </NavLink>
                  )}
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200">
                    {roleLabels[user.role] ?? user.role}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Create account
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content (flex-grow makes it fill space) */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer (sticks to bottom) */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 CPS Academy. Empowering creative tech careers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
