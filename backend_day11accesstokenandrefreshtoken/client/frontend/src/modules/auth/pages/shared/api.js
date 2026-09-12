import axios from 'axios';
import { useUserContext } from "../../../../context/user.context";
const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
});
const useApi = ()=>{
    const { accessToken,setAccessToken } = useUserContext();
    api.interceptors.request.use(config =>{
        config.headers.Authorization = `Bearer ${accessToken} `
        return config;
    } );

    api.interceptors.response.use( async response => {
        if(response.status === 401){
         const res = await api.post("/auth/refresh");
         setAccessToken(res.data.accessToken)

        }
    })

    return api;
}


export default useApi;  