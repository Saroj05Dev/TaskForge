import axiosInstance from "@/helpers/axiosInstance";

export const loginApi = (data) => {
    return axiosInstance.post("/users/login", data);

}

export const logoutApi = () => {
    return axiosInstance.post("/users/logout");
}

export const getCurrentUserApi = () => {
    return axiosInstance.get("/users/me");
}