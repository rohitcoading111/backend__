import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>hellow</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
