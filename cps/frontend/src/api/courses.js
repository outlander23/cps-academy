import client from "./client.js";

export const fetchCourses = async (params = {}) => {
  const response = await client.get("/courses", { params });
  console.log(response);
  return response.data;
};

export const fetchCourseById = async (courseIdOrSlug) => {
  const response = await client.get(`/courses/${courseIdOrSlug}`);
  return response.data;
};

export const createCourse = async (payload) => {
  const response = await client.post("/courses", payload);
  return response.data;
};

export const updateCourse = async (courseIdOrSlug, payload) => {
  const response = await client.patch(`/courses/${courseIdOrSlug}`, payload);
  return response.data;
};

export const deleteCourse = async (courseIdOrSlug) => {
  await client.delete(`/courses/${courseIdOrSlug}`);
};
