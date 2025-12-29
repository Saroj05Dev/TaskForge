import axiosInstance from "@/helpers/axiosInstance";

export const loginApi = (data) =>
  axiosInstance.post("/users/login", data);

export const logoutApi = () =>
  axiosInstance.post("/users/logout");

export const getCurrentUserApi = () =>
  axiosInstance.get("/users/me");