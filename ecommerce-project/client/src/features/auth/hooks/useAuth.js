import { loginApi, registerApi,refreshApi,meApi } from "../apis/authApi.jsx";
import {useDispatch} from "react-redux"
import {loginSuccess,updateAccessToken,finishAuthLoading,setUser} from "../state/authSlice.js"
import { logoutApi } from "../apis/authApi.jsx";
import { logout } from "../state/authSlice.js";

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
    };
    const restoreSession = async () => {
    try {
        const refreshResponse = await refreshApi();

        dispatch(
            updateAccessToken(refreshResponse.accessToken)
        );

        const userResponse = await meApi();

        dispatch(
            setUser(userResponse.data)
        );

    } catch (error) {
        console.log("RESTORE SESSION ERROR:", error);

    } finally {
        dispatch(finishAuthLoading());
    }
};

const logoutUser = async () => {
    try {
        await logoutApi();

        dispatch(logout());

    } catch (error) {
        console.log("LOGOUT ERROR:", error);
    }
};

    return {
        login,
        registerUser,
        refresh,
        restoreSession,
        logoutUser
    };
};

export default useAuth; 