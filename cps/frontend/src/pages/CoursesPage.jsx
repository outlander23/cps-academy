import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../api/courses.js";
import { EmptyState } from "../components/EmptyState.jsx";
import { InlineAlert } from "../components/InlineAlert.jsx";
import { Loader } from "../components/Loader.jsx";
import { useToast } from "../providers/ToastProvider.jsx";

const ITEMS_PER_PAGE = 6;

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { showToast } = useToast();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response.courses ?? []);
      } catch (apiError) {
        const message =
          apiError.response?.data?.message ||
          "We couldn't load your courses right now.";
        setError(message);
        showToast({ type: "error", title: "Unable to load courses", message });
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [showToast]);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader label="Loading courses" />
      </div>
    );
  }

  if (error) {
    return (
      <InlineAlert tone="danger" title="Something went wrong" message={error} />
    );
  }

  if (!courses.length) {
    return (
      <EmptyState
        title="No courses yet"
        message="Once your role is assigned courses, they'll appear here."
        action={
          <Link
            className="py-3 px-4 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-sm"
            to="/"
          >
            Return home
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Explore Courses
        </h1>
        <p className="text-gray-600 text-lg">
          Discover courses tailored for your role and skill level
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="group backdrop-blur-md bg-white/80 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between hover:scale-[1.02]"
          >
            {/* Image Placeholder with gradient */}
            <div className="h-40 bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-5xl">📚</span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-3 text-xs">
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 font-semibold border border-emerald-200">
                🎯 {course.level ?? "Beginner"}
              </span>
              <span className="text-gray-600 font-medium">
                ⏱️ {course.duration ?? "4 weeks"}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
              {course.description}
            </p>

            {/* View Course */}
            <Link
              to={`/courses/${course.slug ?? course.id}`}
              className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 py-2.5 px-4 rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105"
            >
              View course
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-6 py-3 rounded-full border-2 border-gray-200 bg-white text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ← Previous
          </button>
          <span className="text-gray-700 font-medium px-4 py-2 rounded-full bg-white border-2 border-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-6 py-3 rounded-full border-2 border-gray-200 bg-white text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
