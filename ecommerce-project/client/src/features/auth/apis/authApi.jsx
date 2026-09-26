import axiosInstance from "../../../config/axiosInstance";

const loginApi = async (data) => {
    const response = await axiosInstance.post(
        "/login",
        data
    );

    return response.data;
};

const registerApi = async (data) => {
    const response = await axiosInstance.post(
        "/register",
        data
    );

    return response.data;
};

export { loginApi, registerApi };