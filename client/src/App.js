import React from "react"
import FrontPage from "./Components/FrontPage"
import LoginPage from "./Components/LoginPage"

import { Routes, Route } from "react-router-dom"
import { CourseSearch } from "./Components/CourseSearch"
import TopMenu from "./Components/TopMenu"

function App() {
  return (
    <>
      <TopMenu />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<CourseSearch />} />
      </Routes>
    </>
  )
}

export default App
