import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white space-y-16 py-12 px-4 md:px-8 lg:px-16 animate-fade-in">
      {/* Hero Section with Enhanced Design */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Hero Content */}
        <div className="space-y-6 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-sm font-semibold text-blue-800 border border-blue-200 shadow-sm">
            ✨ Transform Your Career
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Level up your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              creative tech
            </span>{" "}
            career
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            CPS Academy delivers curated learning paths, expert-led modules, and
            on-demand recordings—all tailored to your role. Join thousands of
            learners advancing their careers.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-full font-semibold bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Right: Hero Image or Welcome Card */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl animate-fade-in-right">
          {isAuthenticated && user ? (
            <div className="backdrop-blur-md bg-white/80 p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-2xl shadow-md">
                  👋
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Welcome back, {user.name.split(" ")[0]}!
                  </h2>
                  <p className="text-sm text-gray-600">
                    Ready to continue learning?
                  </p>
                </div>
              </div>

              <p className="text-gray-600">
                Jump back into your course catalog to keep building momentum.
              </p>

              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="block w-full text-center py-3 px-6 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Go to my courses →
                </Link>
                {user.role === "developer" && (
                  <Link
                    to="/manage/courses"
                    className="block w-full text-center py-3 px-6 rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                  >
                    Manage course catalog
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <img
              src="https://media.easy-peasy.ai/27feb2bb-aeb4-4a83-9fb6-8f3f2a15885e/929506e4-cb3a-41c7-b050-6e6ce1b53a9d.png"
              alt="Creative tech career illustration with coding and design elements"
              className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
      </section>

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
