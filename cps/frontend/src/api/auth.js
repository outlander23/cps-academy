import client from "./client.js";

export const registerUser = async (payload) => {
  const response = await client.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await client.post("/auth/login", payload);
  return response.data;
};
