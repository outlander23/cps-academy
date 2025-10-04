import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseById } from "../api/courses.js";
import { Loader } from "../components/Loader.jsx";
import { InlineAlert } from "../components/InlineAlert.jsx";
import { CourseDetailSection } from "../components/CourseDetailSection.jsx";
import { useToast } from "../providers/ToastProvider.jsx";

export const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response = await fetchCourseById(courseId);
        setCourse(response.course ?? null);
      } catch (apiError) {
        const message =
          apiError.response?.data?.message || "We couldn't load this course.";
        setError(message);
        showToast({ type: "error", title: "Unable to load course", message });
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, showToast]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex justify-center">
        <Loader label="Fetching course" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid gap-4">
        <InlineAlert tone="danger" title="Course unavailable" message={error} />
        <button
          className="py-3 px-4 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
          type="button"
          onClick={() => navigate(-1)}
        >
          Back to courses
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <InlineAlert
        tone="info"
        title="Course not available"
        message="This course may have been removed or isn't part of your role access yet."
      />
    );
  }

  return <CourseDetailSection course={course} />;
};
