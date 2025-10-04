import {
  getCoursesForRole,
  getCourseByIdForRole,
} from "../services/courseService.js";

export const listCourses = async (req, res) => {
  const role = req.user.role;
  const data = await getCoursesForRole(role);
  return res.json({ courses: data });
};

export const getCourseDetail = async (req, res) => {
  const { courseId } = req.params;
  const role = req.user.role;
  const course = await getCourseByIdForRole(courseId, role);

  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found or inaccessible" });
  }

  return res.json({ course });
};
