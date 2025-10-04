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
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex justify-center">
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
    <div className="grid gap-8">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-3">
        <h2 className="m-0">Curate the course catalog</h2>
        <p className="m-0 text-gray-600">
          Manage the experiences available to each role. Updating a title will
          regenerate its slug safely.
        </p>
      </div>

      <CourseTable
        courses={courses}
        onSelect={handleSelectCourse}
        onDelete={handleDelete}
        deletingId={deletingId}
      />

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 grid gap-4">
        <div className="flex justify-between items-center">
          <h2 className="m-0">
            {selectedCourse ? "Update course" : "Create new course"}
          </h2>
          {selectedCourse && (
            <button
              type="button"
              className="py-2 px-3 rounded-full border-none font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5 hover:brightness-105 bg-blue-50 text-blue-800 shadow-none"
              onClick={resetForm}
            >
              Reset form
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
