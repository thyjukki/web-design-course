import React, { useEffect } from "react"
import FrontPage from "./Components/FrontPage"
import LoginPage from "./Components/LoginPage"

import { Routes, Route, useNavigate } from "react-router-dom"
import { CourseSearch } from "./Components/CourseSearch"
import { ManageCourses } from "./Components/ManageCourses"
import { CreateCourse } from "./Components/CreateCourse"
import TopMenu from "./Components/TopMenu"

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login")
    }
  }, [])
  return (
    <>
      <TopMenu />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<CourseSearch />} />
        <Route path="/manage-courses" element={<ManageCourses />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
    </>
  )
}

export default App
