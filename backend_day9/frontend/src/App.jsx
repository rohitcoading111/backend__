import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreatePost from './pages/CreatePost'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>hellow</h1>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
