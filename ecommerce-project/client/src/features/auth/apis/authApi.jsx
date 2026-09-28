import axiosInstance from "../../../config/axiosInstance";


const loginApi = async (data) => {
    const response = await axiosInstance.post(
        "/auth/login",
        data
    );

    return response.data;
};

const registerApi = async (data) => {
    const response = await axiosInstance.post(
        "/auth/register",
        data
    );

    return response.data;
};

const refreshApi = async ()=>{
     const response = await axiosInstance.post(
        "/auth/refresh",
     )
    return response.data;
}

const meApi = async () => {
    const response = await axiosInstance.get(
        "/auth/me"
    );

    return response.data;
};


export { loginApi, registerApi ,refreshApi ,meApi};