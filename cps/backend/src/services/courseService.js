import { isValidObjectId } from "mongoose";
import { Course } from "../models/course.model.js";

const buildCourseIdentifierQuery = (courseIdOrSlug) => {
  const identifiers = [{ slug: courseIdOrSlug }];

  if (isValidObjectId(courseIdOrSlug)) {
    identifiers.push({ _id: courseIdOrSlug });
  }

  return identifiers;
};

export const getCoursesForRole = async (role) => {
  return Course.find({ audience: role });
};

export const getCourseByIdForRole = async (courseIdOrSlug, role) => {
  return Course.findOne({
    audience: role,
    $or: buildCourseIdentifierQuery(courseIdOrSlug),
  });
};

export const createCourse = async (courseData) => {
  return Course.create(courseData);
};

export const getCourseById = async (courseIdOrSlug) => {
  return Course.findOne({
    $or: buildCourseIdentifierQuery(courseIdOrSlug),
  });
};

export const updateCourse = async (courseIdOrSlug, updates) => {
  return Course.findOneAndUpdate(
    { $or: buildCourseIdentifierQuery(courseIdOrSlug) },
    updates,
    { new: true, runValidators: true }
  );
};

export const deleteCourse = async (courseIdOrSlug) => {
  return Course.findOneAndDelete({
    $or: buildCourseIdentifierQuery(courseIdOrSlug),
  });
};
