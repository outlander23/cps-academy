import { courses } from "../data/demoData.js";

export const getCoursesForRole = (role) =>
  courses.filter((course) => course.audience.includes(role));

export const getCourseByIdForRole = (courseId, role) =>
  courses.find(
    (course) => course.id === courseId && course.audience.includes(role)
  );
