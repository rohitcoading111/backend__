import { RouterProvider } from "react-router";
import router from "./app.routes";

import React from "react";
import { UserProvider } from "../context/user.context";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;