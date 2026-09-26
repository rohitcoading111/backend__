import { createBrowserRouter } from "react-router-dom";

import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home Page</h1>,
    },

    {
        path: "/login",
        element: <LoginForm />,
    },

    {
        path: "/register",
        element: <RegisterForm />,
    },

    {
        path: "/products",
        element: <h1>Products Page</h1>,
    },
]);

export default router;