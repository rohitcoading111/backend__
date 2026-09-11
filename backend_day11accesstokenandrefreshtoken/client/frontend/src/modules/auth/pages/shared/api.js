import axios from 'axios';
import { useUserContext } from "../../../../context/user.context";
const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
});
const useApi = ()=>{
    const { accessToken } = useUserContext();
    api.interceptors.request.use(config =>{
        config.headers.Authorization = `Bearer ${accessToken} `
        return config;
    } );

    return api;
}


export default useApi;  