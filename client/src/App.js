import React, { useEffect } from "react"
import FrontPage from "./Components/FrontPage"
import LoginPage from "./Components/LoginPage"

import { Routes, Route, useNavigate } from "react-router-dom"
import { CourseSearch } from "./Components/CourseSearch"
import TopMenu from "./Components/TopMenu"

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.getItem("token") && navigate("/login")
  }, [])
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
