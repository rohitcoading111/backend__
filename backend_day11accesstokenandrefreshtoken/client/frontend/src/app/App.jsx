import { RouterProvider } from "react-router";
import router from "./app.routes";

import React from "react";
import "./App.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;