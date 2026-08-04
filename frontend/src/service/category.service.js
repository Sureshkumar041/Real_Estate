import api from "./api";

export const getCategoriesService = async (params) => {
    try {
        const response = await api.get("/category/getAll", {
            params,
        });

        return response.data;
    } catch (error) {
        return (
            error.response?.data || {
                success: false,
                message: "Something went wrong",
            }
        );
    }
};