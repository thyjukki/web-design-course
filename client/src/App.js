import React from "react"
import FrontPage from "./Components/FrontPage"
import LoginPage from "./Components/LoginPage"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
