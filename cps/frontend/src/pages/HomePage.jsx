import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="grid gap-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
        <div className="bg-blue-50 rounded-lg p-8">
          <h1 className="m-0 mb-4 text-3xl md:text-4xl leading-tight">
            Level up your creative tech career
          </h1>
          <p className="m-0 text-gray-600 text-lg">
            CPS Academy gives you curated learning paths, guided modules, and
            on-demand class recordings tailored to your role. Log in to resume
            your journey—or create an account to join the cohort.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-4 self-center">
          {isAuthenticated && user ? (
            <>
              <h2 className="m-0">Welcome back, {user.name.split(" ")[0]}!</h2>
              <p className="m-0 text-gray-600">
                Jump back into your course catalog to keep building momentum.
              </p>
              <Link
                to="/courses"
                className="py-3 px-4.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              >
                Go to my courses
              </Link>
              {user.role === "developer" && (
                <Link
                  to="/manage/courses"
                  className="py-3 px-4 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
                >
                  Manage course catalog
                </Link>
              )}
            </>
          ) : (
            <>
              <h2 className="m-0">Start learning in minutes</h2>
              <p className="m-0 text-gray-600">
                Use any of the demo accounts seeded in the backend or sign up
                with your own email to explore the platform.
              </p>
              <Link
                to="/login"
                className="py-3 px-4.5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              >
                Log in to existing account
              </Link>
              <Link
                to="/register"
                className="py-3 px-4 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
              >
                Create a new profile
              </Link>
            </>
          )}
        </div>
      </section>

      {!isAuthenticated && (
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-3">
          <h3 className="m-0">Need demo credentials?</h3>
          <p className="m-0 text-gray-600">
            The backend seeder ships several roles to explore different
            experiences:
          </p>
          <ul className="m-0 pl-4.5 text-gray-600">
            <li>normal → welcome@cpsacademy.com / Password123!</li>
            <li>student → student@cpsacademy.com / Password123!</li>
            <li>developer → dev@cpsacademy.com / Password123!</li>
          </ul>
        </section>
      )}
    </div>
  );
};
