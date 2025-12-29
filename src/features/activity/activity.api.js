import axiosInstance from "@/helpers/axiosInstance";

export const fetchActionsApi = (limit = 20) => {
    return axiosInstance.get(`/actions?limit=${limit}`);
}