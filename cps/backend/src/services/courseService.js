import { Course } from "../models/course.model.js";

export const getCoursesForRole = async (role) => {
  return Course.find({ audience: role });
};

export const getCourseByIdForRole = async (courseId, role) => {
  return Course.findOne({ _id: courseId, audience: role });
};

export const createCourse = async (courseData) => {
  const course = new Course(courseData);
  return course.save();
};
