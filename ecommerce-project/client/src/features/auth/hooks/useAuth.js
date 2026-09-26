import { loginApi, registerApi } from "../apis/authApi.jsx";

const useAuth = () => {
    const login = async (data) => {
        const response = await loginApi(data);

        console.log("LOGIN RESPONSE:", response);
    };
const registerUser = async (data) => {
    const response = await registerApi(data);

    console.log("REGISTER RESPONSE:", response);
};
    return {
        login,
        registerUser
    };
};

export default useAuth;