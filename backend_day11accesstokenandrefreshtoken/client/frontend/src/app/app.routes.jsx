import{createBrowserRouter} from "react-router";
import Register from "../modules/auth/pages/register";
import Profile from "../modules/auth/pages/profile";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/profile",
        element: <Profile />
    }
]);

export default router;