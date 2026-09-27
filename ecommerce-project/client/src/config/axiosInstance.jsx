import axios from "axios";
import store from "../app/store.js"
import { refreshApi } from "../features/auth/apis/authApi.jsx";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config)=>{
   const token =  store.getState().auth.accessToken;
   if(token){
       config.headers.Authorization = `Bearer ${token}`;
   }
   return config
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        if (error.response?.status === 401) {
            const response = await refreshApi();

            console.log("NEW TOKEN:", response.accessToken);
        }
    }
);


export default axiosInstance; 