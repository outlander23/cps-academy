import axios from "axios";
import { AUTH_STORAGE_KEY } from "../providers/AuthProvider.jsx";

const API_BASE_URL = `${
  import.meta.env.VITE_API_URL ?? "http://localhost:8000"
}/v1/api`;

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

client.interceptors.request.use((config) => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Failed to parse auth storage", error);
    }
  }

  return config;
});

export const setAuthHeader = (token) => {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
};

export default client;
