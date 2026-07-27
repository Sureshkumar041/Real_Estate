import api from "./api";

export const loginService = async (data) => {
    try {
        const response = await api.post("/login", data);
        return response.data;
    } catch (error) {
        return error.response?.data || {
            success: false,
            message: "Something went wrong"
        };
    }
};