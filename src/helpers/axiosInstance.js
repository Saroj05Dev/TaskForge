import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 🔐 required for httpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn("401 Unauthorized – session expired or not logged in");
      // later: dispatch logout or redirect
    }

    if (status === 403) {
      console.warn("403 Forbidden – insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
