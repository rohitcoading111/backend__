import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";

import "./index.css";
import router from "./app/router";
import store from "./app/store";
import useAuth from "./features/auth/hooks/useAuth";

const Root = () => {
    const { restoreSession } = useAuth();

    useEffect(() => {
        restoreSession();
    }, []);

    return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Root />
    </Provider>
);