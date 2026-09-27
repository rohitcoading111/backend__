import axios from "axios";
import store from "../app/store.js"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config)=>{
   const token =  store.getState().auth.accessToken;
   console.log("INTERCEPTOR TOKEN:", token);
   if(token){
       config.headers.Authorization = `Bearer ${token}`;
   }
   return config
})


export default axiosInstance; 