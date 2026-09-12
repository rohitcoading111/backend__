import axios from "axios";
import { useUserContext } from "../../../../context/user.context";

const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
});

const useApi = () => {
    const { accessToken, setAccessToken } = useUserContext();

    api.interceptors.request.use((config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },

        async (error) => {
            if (error.response?.status === 401) {
                const res = await axios.post(
                    "http://localhost:5173/api/auth/refresh",
                    {},
                    {
                        withCredentials: true,
                    }
                );

                const newAccessToken = res.data.accessToken;

                setAccessToken(newAccessToken);

                error.config.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(error.config);
            }

            return Promise.reject(error);
        }
    );

    return api;
};

export default useApi;