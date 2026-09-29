import { createBrowserRouter } from "react-router-dom";
import Products from "../features/products/ui/Products";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import AddProduct from "../features/products/ui/AddProduct";
import ProtectedRoutes from "../app/protectedRoutes/ProtectedRoute.jsx";
import EditProduct from "../features/products/ui/EditProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginForm />,
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
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/products",
                element: <Products />
            }
        ]
    },

    {
        path: "/products/add",
        element: <AddProduct />,
    },

    {
        path: "/products/edit/:id",
        element: <EditProduct />
    }
]);

export default router;