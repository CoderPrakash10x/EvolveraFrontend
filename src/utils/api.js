import axios from "axios";

// 👇 backend base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

// 👇 Request interceptor (token auto attach)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 👇 Response interceptor (global error handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired / invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");

      // agar admin panel me hai toh login bhej do
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
