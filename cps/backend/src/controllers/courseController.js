import {
  getCoursesForRole,
  getCourseByIdForRole,
} from "../services/courseService.js";

export const listCourses = (req, res) => {
  const role = req.user.role;
  const data = getCoursesForRole(role);
  return res.json({ courses: data });
};

export const getCourseDetail = (req, res) => {
  const { courseId } = req.params;
  const role = req.user.role;
  const course = getCourseByIdForRole(courseId, role);

  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found or inaccessible" });
  }

  return res.json({ course });
};
