import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import {
  createCourse as createCourseService,
  deleteCourse as deleteCourseService,
  getCourseByIdForRole,
  getCoursesForRole,
  updateCourse as updateCourseService,
} from "../services/courseService.js";

export const listCourses = catchAsync(async (req, res) => {
  const role = req.user.role;
  const data = await getCoursesForRole(role);
  const courses = data.map((course) => course.toJSON());
  return res.json({ courses });
});

export const getCourseDetail = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const role = req.user.role;
  const course = await getCourseByIdForRole(courseId, role);

  if (!course) {
    throw new AppError("Course not found or inaccessible", 404);
  }

  return res.json({ course: course.toJSON() });
});

export const createCourse = catchAsync(async (req, res) => {
  const course = await createCourseService(req.body);
  return res.status(201).json({ course: course.toJSON() });
});

export const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const updates = req.body;
  const course = await updateCourseService(courseId, updates);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return res.json({ course: course.toJSON() });
});

export const deleteCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const deleted = await deleteCourseService(courseId);

  if (!deleted) {
    throw new AppError("Course not found", 404);
  }

  return res.status(204).send();
});
