import { loginApi, registerApi } from "../apis/authApi.jsx";
import {useDispatch} from "react-redux"
import {loginSuccess} from "../state/authSlice.js"

const useAuth = () => {
    const dispatch = useDispatch()

    const login = async (data) => {
        const response = await loginApi(data);
        dispatch(loginSuccess(response))
    };
    const registerUser = async (data) => {
    const response = await registerApi(data);
};
    return {
        login,
        registerUser
    };
};

export default useAuth; 