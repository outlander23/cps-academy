import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white space-y-16 py-12 px-4 md:px-8 lg:px-16 animate-fade-in">
      <div className="flex-1 relative animate-slide-up">
        {isAuthenticated && user ? (
          <div className="backdrop-blur-md bg-white/80 rounded-2xl p-8 shadow-2xl border border-gray-200/70 space-y-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            {/* User Greeting */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-3xl shadow-md">
                👋
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome back, {user.name.split(" ")[0]}!
                </h2>
                <p className="text-sm text-gray-600">
                  Let’s continue learning 🚀
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-600 leading-relaxed">
              Pick up where you left off in your learning journey.
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <Link
                to="/courses"
                className="block w-full text-center py-3 px-6 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Continue Learning →
              </Link>

              {user.role === "developer" && (
                <Link
                  to="/manage/courses"
                  className="block w-full text-center py-3 px-6 rounded-full font-semibold bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
                >
                  Manage Course Catalog
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="backdrop-blur-md bg-white/80 rounded-2xl p-8 shadow-lg border border-gray-200/70 text-center space-y-4">
            <div className="text-5xl">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800">
              Ready to kickstart your journey?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Sign up or log in to explore our expert-led courses.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-full font-semibold bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>

      {!isAuthenticated && (
        <section className="backdrop-blur-md bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200/50 shadow-lg animate-fade-in-up">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🔑 Try Demo Accounts
            </h3>
            <p className="text-gray-600 mb-6">
              Explore different role experiences with our pre-seeded accounts:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  role: "Learner",
                  email: "welcome@cpsacademy.com",
                  icon: "👤",
                },
                {
                  role: "Student",
                  email: "student@cpsacademy.com",
                  icon: "🎓",
                },
                {
                  role: "Social Manager",
                  email: "smm@cpsacademy.com",
                  icon: "💼",
                },
                { role: "Developer", email: "dev@cpsacademy.com", icon: "💻" },
              ].map((account, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-sm bg-white/70 rounded-lg p-4 border border-gray-200/50 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{account.icon}</span>
                    <span className="font-semibold text-gray-800">
                      {account.role}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono">
                    {account.email}
                  </p>
                  <p className="text-sm text-gray-500 font-mono">
                    Password123!
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
