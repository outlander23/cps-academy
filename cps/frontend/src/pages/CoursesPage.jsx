import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../api/courses.js";
import { EmptyState } from "../components/EmptyState.jsx";
import { InlineAlert } from "../components/InlineAlert.jsx";
import { Loader } from "../components/Loader.jsx";
import { CourseCard } from "../components/CourseCard.jsx";
import { useToast } from "../providers/ToastProvider.jsx";

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex justify-center">
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
            className="py-3 px-4 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
            to="/"
          >
            Return home
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          to={`/courses/${course.slug ?? course.id}`}
        />
      ))}
    </div>
  );
};
