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
    <div className="flex flex-col gap-6">
      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between"
          >
            {/* Image Placeholder */}
            <div className="h-40 bg-purple-50 rounded-md mb-4"></div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
              <span className="px-2 py-1 rounded-full bg-gray-100 font-semibold">
                {course.level ?? "Beginner"}
              </span>
              <span>{course.duration ?? "4 weeks"}</span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>

            {/* View Course */}
            <Link
              to={`/courses/${course.slug ?? course.id}`}
              className="text-purple-600 font-medium text-sm flex items-center gap-1 hover:underline"
            >
              View course <span className="text-sm">→</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition"
          >
            ← Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
