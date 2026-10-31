import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./app/store";
import { router } from "./app/router";
import AuthInitializer from "./app/AuthInitializer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SmoothScroll />
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  </Provider>
);