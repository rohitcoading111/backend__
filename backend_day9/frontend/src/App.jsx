import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed' 
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePost/>}/>
        <Route path='/feed-post' element={<Feed/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
