import { createBrowserRouter } from "react-router-dom";
import Products from "../features/products/ui/Products";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import AddProduct from "../features/products/ui/AddProduct";

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
    element: <Products />,
},
{
    path: "/products/add",
    element: <AddProduct />,
},
]);

export default router;