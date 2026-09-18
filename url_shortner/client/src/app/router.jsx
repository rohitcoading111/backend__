import React from 'react'
import {createBrowserRouter} from "react-router"
import Home from "../features/url/pages/Home.jsx"
import Dashboard from "../features/url/pages/Dashboard.jsx"


  const  router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/dashboard",
        element: <Dashboard />
    }
  ])


export default router
