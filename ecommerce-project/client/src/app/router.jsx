import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home Page</h1>
    },
    {
        path: "/login",
        element: <h1>Login Page</h1>
    },
    {
        path: "/register",
        element: <h1>Register Page</h1>
    },
    {
        path: "/products",
        element: <h1>Products Page</h1>
    }
]);

export default router;