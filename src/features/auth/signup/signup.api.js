import axiosInstance from "@/helpers/axiosInstance";

export const signupApi = (data) => {
  return axiosInstance.post("/users", data);
};
