
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";

import { store } from "./app/store";
import { router } from "./app/router";
import AuthInitializer from "./app/AuthInitializer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";

document.head
  .querySelectorAll("[data-rh]")
  .forEach((element) => element.remove());

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Provider store={store}>
      <SmoothScroll />
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </Provider>
  </HelmetProvider>
);
