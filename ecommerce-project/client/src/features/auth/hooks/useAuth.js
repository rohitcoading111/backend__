import { loginApi, registerApi,refreshApi } from "../apis/authApi.jsx";
import {useDispatch} from "react-redux"
import {loginSuccess,updateAccessToken} from "../state/authSlice.js"


const useAuth = () => {
    const dispatch = useDispatch()

    const login = async (data) => {
        const response = await loginApi(data);
        dispatch(loginSuccess(response))
    };
    const registerUser = async (data) => {
    const response = await registerApi(data);
   };

    const refresh = async ()=>{
        const res = await refreshApi()
        dispatch(updateAccessToken(res.accessToken))
    }
    return {
        login,
        registerUser,
        refresh
    };
};

export default useAuth; 