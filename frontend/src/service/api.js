import axios from "axios";
import { BACKEND_URL } from "../common/constant";

const api = axios.create({
    baseURL: BACKEND_URL, // Change to your backend URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default api;