import { useEffect, useState } from "react";
import {
  createCourse,
  deleteCourse,
  fetchCourseById,
  fetchCourses,
  updateCourse,
} from "../api/courses.js";
import { CourseForm } from "../components/CourseForm.jsx";
import { CourseTable } from "../components/CourseTable.jsx";
import { InlineAlert } from "../components/InlineAlert.jsx";
import { Loader } from "../components/Loader.jsx";
import { useToast } from "../providers/ToastProvider.jsx";

export const ManageCoursesPage = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const refreshCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchCourses();
      setCourses(response.courses ?? []);
    } catch (apiError) {
      const message =
        apiError.response?.data?.message ||
        "We couldn't load courses right now.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCourses();
  }, []);

  const handleSelectCourse = async (course) => {
    try {
      const detail = await fetchCourseById(course.slug ?? course.id);
      setSelectedCourse(detail.course);
    } catch (apiError) {
      const message =
        apiError.response?.data?.message || "We couldn't fetch that course.";
      showToast({ type: "error", title: "Unable to fetch course", message });
    }
  };

  const resetForm = () => setSelectedCourse(null);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (selectedCourse) {
        const updated = await updateCourse(
          selectedCourse.slug ?? selectedCourse.id,
          payload
        );
        showToast({
          type: "success",
          title: "Course updated",
          message: `${updated.course.title} has been refreshed.`,
        });
      } else {
        const created = await createCourse(payload);
        showToast({
          type: "success",
          title: "Course created",
          message: `${created.course.title} is now live in the catalog.`,
        });
      }
      resetForm();
      await refreshCourses();
    } catch (apiError) {
      const message =
        apiError.response?.data?.message || "We couldn't save the course.";
      showToast({ type: "error", title: "Save failed", message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (course) => {
    if (!window.confirm(`Delete ${course.title}? This cannot be undone.`)) {
      return;
    }
    setDeletingId(course.id);
    try {
      await deleteCourse(course.slug ?? course.id);
      showToast({
        type: "success",
        title: "Course deleted",
        message: `${course.title} has been removed from the catalog.`,
      });
      if (selectedCourse?.id === course.id) {
        resetForm();
      }
      await refreshCourses();
    } catch (apiError) {
      const message =
        apiError.response?.data?.message || "We couldn't delete that course.";
      showToast({ type: "error", title: "Delete failed", message });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-lg p-12 border border-gray-200/50 flex justify-center">
        <Loader label="Loading course catalog" />
      </div>
    );
  }

  if (error) {
    return (
      <InlineAlert
        tone="danger"
        title="Unable to load courses"
        message={error}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="backdrop-blur-md bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200/50">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          🎓 Curate the Course Catalog
        </h2>
        <p className="text-gray-700 text-lg">
          Manage the experiences available to each role. Updating a title will
          regenerate its slug safely.
        </p>
      </div>

      {/* Courses Table */}
      <CourseTable
        courses={courses}
        onSelect={handleSelectCourse}
        onDelete={handleDelete}
        deletingId={deletingId}
      />

      {/* Course Form */}
      <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-200/50 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {selectedCourse ? <>✏️ Update Course</> : <>✨ Create New Course</>}
          </h2>
          {selectedCourse && (
            <button
              type="button"
              className="py-2.5 px-5 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 shadow-md"
              onClick={resetForm}
            >
              ↺ Reset form
            </button>
          )}
        </div>
        <CourseForm
          initialValue={selectedCourse ?? undefined}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
};
