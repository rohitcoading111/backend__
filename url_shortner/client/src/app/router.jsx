import React from 'react'
import {createBrowserRouter} from "react-router"
import Home from "../features/url/pages/Home.jsx"



  const  router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
  ])


export default router
